//  User roles
export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

// Task statuses
export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);