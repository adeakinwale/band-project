const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

let dbURL;
if (process.env.DATABASE_URL) {
  dbURL = process.env.DATABASE_URL;
} else {
  const secrets = require("./secrets.json");
  dbURL = secrets.dbURL;
}
const db = spicedPg(dbURL);
////END DB

//paswrd hash sec
module.exports.hash = pass => {
  return genSalt().then(salt => {
    return hash(pass, salt);
  });
};

module.exports.checkPass = (pass, hash) => {
  return compare(pass, hash);
};

exports.createUser = function(firstname, lastname, email, password) {
  return db.query(
    `INSERT INTO member (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [firstname || null, lastname || null, email || null, password || null]
  );
};

module.exports.loginUser = email => {
  return db
    .query(
      `SELECT * FROM member
			WHERE email = $1`,
      [email || null]
    )
    .then(function(results) {
      //console.log("Running loginUser db func:", results.rows);
      return results.rows[0];
    })
    .catch(function(err) {
      console.log("There was an error in loginUser func:", err);
    });
};

//GET PROFILE
module.exports.getUserProfile = function(id) {
  return db
    .query(
      `SELECT *
		     FROM member
		 	 WHERE id = $1
			`,
      [id]
    )
    .then(function(results) {
      // console.log("Running getProfile db func", results.rows);
      return results.rows[0];
    })
    .catch(function(err) {
      console.log("There was an error in getUserProfile func!", err);
    });
};

exports.insertUrl = function(url, id) {
  return db.query(
    `UPDATE member
      SET url = $1
      WHERE id = $2 RETURNING url`,
    [url, id]
  );
};
exports.inserContent = function(track, user_id) {
  return db.query(
    `INSERT INTO content (track, user_id)
      VALUES ($1, $2)
       RETURNING *`,
    [track, user_id]
  );
};

exports.changeBio = function(bio, id) {
  return db.query(
    `UPDATE member
      SET bio = $1
      WHERE id = $2 RETURNING bio`,
    [bio, id]
  );
};

module.exports.getFriendReqStatus = function(userid, searchedid) {
  var query = `SELECT id,receiver_id ,sender_id ,status
    FROM friendships
    WHERE (receiver_id=$1 and sender_id=$2)
    OR (receiver_id= $2 and sender_id=$1)`;
  return db.query(query, [userid, searchedid]);
};

module.exports.addFriend = function(sender_id, receiver_id) {
  var query = `INSERT INTO friendships(sender_id,receiver_id)
	VALUES($1,$2) RETURNING *`;

  return db.query(query, [sender_id || null, receiver_id || null]);
};
////EDIT PROFILE///
exports.editProfile = function(firstname, lastname, email, bio, id) {
  return db.query(
    `UPDATE member
      SET  firstname=$1, lastname=$2, email=$3, bio=$4
      WHERE id = $5 RETURNING *`,
    [firstname || null, lastname || null, email || null, bio, id]
  );
};
////END///////////
////EDIT CONTENT///
exports.editContent = function(filename, image, media_type, user_id) {
  return db.query(
    `UPDATE content
      SET  filename=$1, image=$2, media_type=$3
      WHERE id = $4 RETURNING *`,
    [filename || null, image || null, media_type || null]
  );
};
////END///////////
//GET CONTENT //////
module.exports.getContent = function(user_id) {
  const query = `SELECT * FROM content WHERE user_id = $1 `;
  return db.query(query, [user_id]);
};
////END///////

module.exports.getRequestStatus = function(userid, searchedid) {
  var query = `SELECT id,receiver_id ,sender_id ,status
    FROM friendships
    WHERE (receiver_id=$1 and sender_id=$2)
    OR (receiver_id= $2 and sender_id=$1)`;
  return db.query(query, [userid, searchedid]);
};

module.exports.acceptFriendRequest = function(sender_id, receiver_id) {
  var query = `
                UPDATE friendships
                SET status = 2
                WHERE (receiver_id = $1 OR sender_id = $1)
                AND (receiver_id = $2 OR sender_id = $2)
                RETURNING *`;
  return db.query(query, [sender_id, receiver_id]);
};
module.exports.deleteFriendRequest = function(receiver_id, sender_id) {
  console.log("Running delet friedRequest:", receiver_id, sender_id);
  var query = `DELETE from friendships
    WHERE (receiver_id=$1 and sender_id=$2)
    OR (receiver_id= $2 and sender_id=$1)`;
  return db.query(query, [receiver_id, sender_id]);
};

module.exports.getFriends = function(receiver_id) {
  var query = ` SELECT users.id, firstname, lastname, url, status
    FROM friendships
    JOIN users
    ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)`;
  return db.query(query, [receiver_id]);
};

module.exports.getUsersByIds = function(arrayOfIds) {
  const query = `SELECT * FROM users WHERE id = ANY($1)`;
  return db.query(query, [arrayOfIds]);
};

module.exports.getChatMessage = function() {
  const query = `SELECT users.id,firstname, lastname, url,chats.id as chatid,sender_id,to_char(send_at,'Day, DD-MM-YYYY HH12:MI:SS OF') as send_at,message
    FROM chats
    LEFT JOIN users
    ON (sender_id = users.id)
    ORDER BY chatid DESC
    LIMIT 2`;
  return db.query(query);
};

module.exports.saveChatMessage = function(senderid, message) {
  var query = `INSERT INTO chats(sender_id,message)
	VALUES($1,$2) RETURNING id as chatid,sender_id,to_char(send_at,'Day, DD-MM-YYYY HH12:MI:SS OF') as send_at,message`;

  return db.query(query, [senderid || null, message || null]);
};
module.exports.getFriendsWannabes = function(receiverid) {
  var query = ` SELECT users.id, fname, lname, imageurl, status
    FROM friendships
    JOIN users
    ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)`;
  return db.query(query, [receiverid]);
};
/******************************************************************/
module.exports.updateFriendshipRequest = function(sender_id, receiver_id) {
  console.log("in update friendreq:", sender_id, receiver_id);
  var query = `UPDATE friendships SET status=2
     WHERE (receiver_id=$1 and sender_id=$2)
     OR (receiver_id= $2 and sender_id=$1) RETURNING *`;
  return db.query(query, [sender_id, receiver_id]);
};
/*****************************************************************/
