import notifee, { EventType } from "@notifee/react-native";

export default async function Setup() {
  // Background fetch setup (recommend extracting into separate file)
}

const BackgroundSetupHelper = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
      // Update external API
      await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
        method: "POST",
      });

      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });
};
