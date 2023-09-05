const userErrorMessages = {
  validPhoneNo: "Please enter a valid Pakistani phone number",
  alreadyRegistered: "Phone number already registered",
  registrationFailed: "Registration failed",
  login: "Incorrect phone number or password",
  currentPassword: "Incorrect current password",
  noUser: "User not found",
  passwordChangeFailed: "Password change failed",
  adminFailed: "Unable to make admin",
  permissionDenied: "User is not admin",
  adminUser:"User is admin"
};

const woundedAnimalErrors = {
  noImageFileError: "No image file provided",
  userNotFoundError: "User not found",
  postNotFoundError: "Post not found",
  permissionDeniedError: "User unable to delete this post",
  unableToDelete: "Unable to delete this post"
};

const vetDocErrorMessages = {
  alreadyRegistered: "Doctor already registered",
  registrationFailed: "Registration failed",
  notfound:"Doctor not found",
  serverError: "Server error",
};

export { userErrorMessages, woundedAnimalErrors, vetDocErrorMessages };