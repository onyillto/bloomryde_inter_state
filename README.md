I've thoroughly reviewed the BloomRydes Interstate web application documentation. This is a comprehensive interstate travel matching platform connecting passengers with verified drivers. Let me summarize the key aspects I understand:

## Core Concept
- **Matching platform** (not a ride-hailing service like Uber)
- Passengers search for trips, find drivers going their route
- Direct phone communication between parties
- Cash payment handled in person (no payment processing)
- Heavy emphasis on safety through driver verification

## Key User Flows

**Passengers (3-5 min registration):**
1. Phone OTP authentication
2. Quick profile setup (name, email, photo, emergency contact)
3. Search trips (from/to, date, passenger count)
4. View available drivers with full details
5. Contact driver directly via phone
6. Share trip details with emergency contacts

**Drivers (10-15 min registration, 24-48hr verification):**
1. Phone OTP authentication
2. Comprehensive 4-step registration:
   - Personal info
   - Verification documents (license, NIN, selfie with ID)
   - Emergency contact & guarantor details
   - Vehicle info (including **critical passenger seat capacity**)
3. Admin verification process
4. Create trips with route, date/time, available seats, pricing
5. Manage bookings and communicate with passengers

## Critical Data Points

**Vehicle Capacity:** Total passenger seats (excluding driver) - ranges from 4 (sedan) to 14 (mini-bus)

**Safety Features:**
- Driver verification badge
- Trip sharing functionality
- Emergency contacts on both sides
- Guarantor system for drivers
- Vehicle documentation requirements

**Notable Design Decisions:**
- No in-app payment processing
- Phone-based final communication
- Platform acts as trusted intermediary
- Focus on simplicity and speed

This is well-structured for a Flutter/React implementation. What specific aspect would you like me to help you build or clarify?