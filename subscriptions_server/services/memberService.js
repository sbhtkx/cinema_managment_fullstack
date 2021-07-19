const Member = require("../models/MemberModel");

const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};

const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    const newMemberDoc = new Member(newMember);
    newMemberDoc.save((err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const updateMember = (id, memberChanges) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, memberChanges, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    Member.remove({}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  deleteAll,
};
