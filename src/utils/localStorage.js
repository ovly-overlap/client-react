const USERS_KEY = "ovly-users";
const CURRENT_USER_KEY = "ovly-current-user-id";

const defaultUserData = {
  introduce: "안녕하세요! ovly에서 최애 기록을 남기고 있어요.",
  todos: [],
};

const readJson = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = () => readJson(USERS_KEY, {});

export const getCurrentUserId = () => localStorage.getItem(CURRENT_USER_KEY);

export const setCurrentUserId = (userId) => {
  localStorage.setItem(CURRENT_USER_KEY, userId);
};

export const createUser = ({ id, password }) => {
  const users = getUsers();

  if (users[id]) {
    return { ok: false, message: "이미 존재하는 아이디입니다." };
  }

  users[id] = {
    id,
    password,
    ...defaultUserData,
  };

  writeUsers(users);
  setCurrentUserId(id);

  return { ok: true, user: users[id] };
};

export const loginUser = ({ id, password }) => {
  const users = getUsers();
  const user = users[id];

  if (!user || user.password !== password) {
    return { ok: false, message: "아이디 또는 비밀번호를 확인해주세요." };
  }

  setCurrentUserId(id);
  return { ok: true, user };
};

export const getCurrentUser = () => {
  const currentUserId = getCurrentUserId();
  const users = getUsers();

  if (currentUserId && users[currentUserId]) {
    return users[currentUserId];
  }

  return null;
};

export const updateCurrentUser = (updates) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const users = getUsers();
  users[currentUser.id] = {
    ...currentUser,
    ...updates,
    id: updates.id ?? currentUser.id,
  };

  if (updates.id && updates.id !== currentUser.id) {
    delete users[currentUser.id];
    setCurrentUserId(updates.id);
  }

  writeUsers(users);
  return users[updates.id ?? currentUser.id];
};

export const isUserIdAvailable = (userId) => !getUsers()[userId];
