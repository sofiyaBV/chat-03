const loginUser = {
  flexDirection: "row-reverse",
  backgroundColor: "#2F70AF",
  borderRadius: "20px 20px 0px 20px",
};

const otherUsers = {
  backgroundColor: "#806491",
  borderRadius: "20px 20px 20px 0px",
};

export function styleMessageByUser(messages, user) {
  return messages.current_uid === user.uid ? loginUser : otherUsers;
}
