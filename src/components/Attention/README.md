# Notifications
Use notifications to alert users about changes in the product, such as completed actions and new feature announcements.

## Notification Types
There are 3 types of notifications: attention bars, alert boxes, and notification tray messages.

OUI docs for attention bars and alert boxes

### Attention Bars
Use an attention bar for important announcements, such as critical bugs, warnings, and service impairments. This bar sits above the global navigation and there cannot be more than 1 at a time. Thus, use them judiciously. Since they aren't dismissable with an "x", add a call to action button at the end of the message (e.g. "Learn More").

Messages should be 1 or 2 sentences long, and not break onto multiple lines.

Attention bars can be styled as brand, warning, good news, or error.

### _Do_
![alt text](http://design.optimizely.com/assets/img/design-patterns/product/notifications/attention-do.png "example of notification component")

### _Don't_
![alt text](http://design.optimizely.com/assets/img/design-patterns/product/notifications/attention-dont.png "example of notification component")

*The messages' tone doesn't match the visual style (friendly vs. error). In the bottom two, the button's styles don't match the alert's styles.*

**Editor Attention Bar**
Use the editor attention bar to alert users to system state of the editor. Most commonly, this refers to the compatibility mode and SDK upgrade messages. Unlike the main attention bar, this one is dismissable.

### Alert Boxes
Use alert boxes to display information about the system state inline, such as successfully saving settings, archiving an experiment, or the number of segmentable audiences a person is using.

These messages take two forms. First, they appear and disappear automatically in response to user actions. This is the case in the settings panel, for example. Second, they can appear statically in dialogs or above tables to alert users to special information, such as the number of experiments an audience is used in.

Alert boxes can be styled as **brand**, **warning**, **success**, or **error**.

![alt text](http://design.optimizely.com/assets/img/design-patterns/product/notifications/attention-3.png "example of alert boxes")

# Notification Tray Messages
Use notification tray messages to tell users about non-critical information, such as new features, beta releases, account changes, project or experiment changes, and results. The messages should be short, clear, and direct users to take action (e.g. "Read the blog post announcing this feature").

Do not spam users with notifications. Only add messages that are relevant and useful. If a source of messages would flood a person's tray, you probably shouldn't add it to the notification tray. Overflowing the notification tray **devalues all messages** in the tray, and undermines the usefulness of the tray.

Note: this section needs to be fleshed out with more information about message icons.

![alt text](http://design.optimizely.com/assets/img/design-patterns/product/notifications/tray-messages.png "example of alert messages")