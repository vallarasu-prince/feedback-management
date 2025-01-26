import {
  TeamOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  BellOutlined,
  AppstoreOutlined,
  BugOutlined,
  BulbOutlined,
  EditOutlined,
  AndroidOutlined,
  AppleOutlined,
  ChromeOutlined,
} from "@ant-design/icons";

export interface FeedBackPlatform {
  icon: React.ReactNode;
  label: string;
  color: string;
}
export interface FeedBackModule {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export interface FeedBackTag {
  icon: React.ReactNode;
  label: string;
  color: string;
}
export interface FeedBackStatus {
  label: string;
  color: string;
}

export const G_FEEDBACK_MODULES_ORDER = [
  "channel",
  "project",
  "tasks",
  "chat",
  "alert",
];

export const G_FEEDBACK_TAGS_ORDER = ["feedback", "bug", "idea", "feature"];

export const G_FEEDBACK_PLATFORMS_ORDER = ["android", "ios", "web"];

export const G_FEEDBACK_STATUS_ORDER = [
  "new",
  "inProgress",
  "inReview",
  "hold",
  "resolved",
];

export const G_FEEDBACK_MODULE_MAP: Record<string, FeedBackModule> = {
  channel: {
    label: "Channel",
    icon: <TeamOutlined />,
    color: "yellow",
  },
  project: {
    label: "Project",
    icon: <ProjectOutlined />,
    color: "yellow",
  },
  tasks: {
    label: "Tasks",
    icon: <CheckCircleOutlined />,
    color: "yellow",
  },
  chat: {
    label: "Chat",
    icon: <MessageOutlined />,
    color: "yellow",
  },
  alert: {
    label: "Alert",
    icon: <BellOutlined />,
    color: "yellow",
  },
};

export const G_FEEDBACK_TAG_MAP: Record<string, FeedBackTag> = {
  feedback: {
    label: "Feedback",
    color: "orange",
    icon: <EditOutlined />,
  },

  bug: {
    label: "Bug Report",
    color: "red",
    icon: <BugOutlined />,
  },

  idea: {
    label: "Idea",
    color: "green",
    icon: <BulbOutlined />,
  },
  feature: {
    label: "Feature Request",
    color: "blue",
    icon: <AppstoreOutlined />,
  },
};

export const G_FEEDBACK_PLATFORM_MAP: Record<string, FeedBackPlatform> = {
  android: {
    icon: <AndroidOutlined />,
    label: "Android",
    color: "orange",
  },
  ios: {
    icon: <AppleOutlined />,
    label: "iOS",
    color: "orange",
  },
  web: {
    icon: <ChromeOutlined />,
    label: "Web",
    color: "orange",
  },
};

export const G_FEEDBACK_STATUS_MAP: Record<string, FeedBackStatus> = {
  new: {
    label: "New",
    color: "yellow",
  },
  inProgress: {
    label: "In Progress",
    color: "orange",
  },
  inReview: {
    label: "In Review",
    color: "blue",
  },
  hold: {
    label: "Hold",
    color: "red",
  },
  resolved: {
    label: "Resolved",
    color: "green",
  },
};

export const setTokenandRedirect = async (payload: any) => {
  const { user, token } = payload || {};
  localStorage.setItem("fmToken", token);
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "/";
};
