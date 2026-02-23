// Settings menu structure
export const SETTINGS_GROUPS = [
  {
    title: "Account",
    items: [
      {
        icon: "user-circle-o",
        label: "Account Information",
        route: "/account-info",
      },
      { icon: "lock", label: "Change Password", route: "/change-password" },
      {
        icon: "bell-o",
        label: "Notification Preferences",
        route: "/notification-settings",
      },
      {
        icon: "language",
        label: "Language Settings",
        route: "/language-settings",
      },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "question-circle-o", label: "Help Center / FAQ", route: "/faq" },
      {
        icon: "headphones",
        label: "Contact Support",
        route: "/contact-support",
      },
      { icon: "ticket", label: "Submit a Ticket", route: "/submit-ticket" },
    ],
  },
  {
    title: "Legal",
    items: [
      { icon: "shield", label: "Privacy Policy", route: "/privacy-policy" },
      {
        icon: "file-text-o",
        label: "Terms of Service",
        route: "/terms-of-service",
      },
    ],
  },
];
