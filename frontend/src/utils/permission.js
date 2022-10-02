const permissions = {
  VIEW_PANEL: 0b00000000000000000000000000000001,
  CREATE_EVENT: 0b00000000000000000000000000000010,
  UPDATE_EVENT: 0b00000000000000000000000000000100,
  DELETE_EVENT: 0b00000000000000000000000000001000,
  RESTRICTIONS_VIEW: 0b10000000000000000000000000000000,
  HANDLE_RESTRICTIONS: 0b00000000000100000000000000000000,
  ADMINISTER: 0b11111111111111111111111111111111,
};

export default permissions;