export const generateNewUser = (): string => {
    return "Auto TestUser "+ [Math.floor(Math.random() * 1001)];
};

export const generatePassword = (): string => {
    return "Pass "+ [Math.floor(Math.random() * 10001)];
};

export const generateNewProject = (): string => {
    return "Test Project "+ [Math.floor(Math.random() * 1001)];
};

export const generateNewItem = (): string => {
    return "Item Name "+ [Math.floor(Math.random() * 1001)];
};