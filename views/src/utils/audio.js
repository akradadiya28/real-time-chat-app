const notificationSound = new Audio('/sounds/notification.mp3');

export const playNotificationSound = () => {
    notificationSound.currentTime = 0; 
    notificationSound.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
};

export default playNotificationSound; 