export const generateNewUser = (): string => {
    return "Auto TestUser "+ [Math.floor(Math.random() * 1001)];
};

export const generateNewProject = (): string => {
    return "Test Project "+ [Math.floor(Math.random() * 1001)];
};

export const generateNewItem = (): string => {
    return "Item Name "+ [Math.floor(Math.random() * 1001)];
};