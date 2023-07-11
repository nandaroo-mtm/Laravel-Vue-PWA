import axios from "axios";

const sendNotification = async (message) => {
  let token = localStorage.getItem("currentFBToken");

  const serverKey =
    "AAAA2CE0Bbk:APA91bGVFVfDLHnI7X29vHACHF7mZzX3qfLUcvi7Votbr57_HSIPWbx8P_7JBfGx-Op2fiBxA7_ZXyqrQRrx75u7I4a7SQhUFlh0uBavFWwPYUMjN7oqtCWYalnPPcAqxsc1zDuUnTLB";

  const notificationPayload = {
    notification: {
      title: message.title,
      body: message.body,
      icon: "@/assets/flower_1.jpg",
    },
    // Additional data or options for the notification
    data: {
      // ...
    },
    // Target device(s) using registration token(s) or topic
    // Choose one of the following:
    // - registration_ids: Array of registration tokens
    // - topic: Topic to send the notification to
    registration_ids: [token],
    // or
    // topic: 'YOUR_TOPIC_NAME',
  };

  try {
    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      notificationPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serverKey}`,
        },
      }
    );
  } catch (error) {
    console.log("Error sending push notification:", error);
  }
};

export { sendNotification };
