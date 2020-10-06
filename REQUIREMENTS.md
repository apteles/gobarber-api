# Forgot password

**RF**
 - The user must be able recover your password supplying e-mail.
 - The user must be able receive e-mail with instructions to recovery your password.
 - The user must be able reset your password.

**RNF**
- Use Mailtrap service for test the sending in dev environment.
- Use Amazon SES for sending emails in production environment.
- The sending of e-mails must be happen in background jobs.

**RN**
- The lint sent via email to reset the password must expires in 2 hours.
- The user needs to confirm the new password when resetting it.

# Updating profile

**RF**

- The user must be able update your name, email and password.

**RNF**

- The user cannot be able update your email with one already taken.
- The user when updating your password must supply the previous password.
- The user when updating your password must confirm the new one.

# Provider panel

**RF**
- The provider should be able listing your appointments in a pre defined day.
- The provider must receive notification always has happen a new appointment.
- The provider must be able visualize notifications non read.
**RNF**
- The appointments of provider in current day must be storaged in cache.
- The notifications of provider must be storaged in MongoDB.
- The notification of provider must be in real time using Socket.io.
**RN**
- The provider should be able mark notification read and non read.
# Scheduling services

**RF**
- The user must be able see a listing of providers.
- The user must be able see the appointment of provider with days available.
- The user must be able listing the appointments of pre defined day of the provider chosen.
- The user should be able schedule an appointment with a provider in a available schedule.
**RNF**
- The listing of providers must be storaged in cache.

**RN**

- Each appointment must spend 1h (one hour) exactly.
- The appointments must be available between 8am until 18pm (first appointment at 8am, last one at 17pm).
- The user cannot be able schedule in an appointment already taken.
- The user cannot be able schedule in an appointment that has passed.
- The provider cannot schedule an appointment with himself.
