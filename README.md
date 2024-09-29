# Tow Service - 24-Hour Emergency Roadside Assistance Service

## Project Overview
Tow Service is a full-stack web application designed to manage a 24-hour emergency roadside assistance service. The application allows users to request emergency roadside services, manage service vehicles, and track ongoing service operations in real time. It provides seamless user experiences for both customers needing assistance and the service provider.

---

## Key Features
- **Service Requests**: Customers can request emergency roadside assistance, specifying the service needed (towing, tire change, jump start, etc.), and track the status of their request.
- **Vehicle Management**: Information related to vehicles needing service (brand, model, license plate, owner information) is stored and managed.
- **Customer Management**: The application maintains records of customer details, including name, contact information, and address for service follow-ups.

---

## Technologies Used

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## Data Models

### 1. **ServiceRequest**
- Tracks customer roadside assistance requests.
- Attributes:
  - `requestId`: Unique ID for each request.
  - `customerId`: Reference to the customer making the request.
  - `vehicleId`: Reference to the vehicle that needs assistance.
  - `serviceType`: Type of service needed (e.g., towing, tire change, battery jump).
  - `status`: Status of the request (e.g., pending, in-progress, completed).

### 2. **Vehicle**
- Stores vehicle details for service operations.
- Attributes:
  - `vehicleId`: Unique identifier for the vehicle.
  - `ownerId`: Reference to the owner (customer).
  - `brand`: Vehicle brand.
  - `model`: Vehicle model.
  - `licensePlate`: Vehicle's license plate number.

### 3. **Customer**
- Holds customer information.
- Attributes:
  - `customerId`: Unique identifier for the customer.
  - `name`: Full name of the customer.
  - `email`: Customer's email address.
  - `phone`: Customer's phone number.
  - `address`: Customer's home or service location address.

---

## Team Members
- **[Member 1 Name]** - Hein Thant
- **[Member 2 Name]** - Thaw Htut Soe
---
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tow-service.git
   cd tow-service

2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables by creating a .env file in the root of the project. Add the following:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

4. Start the development server:

    ```bash
    npm run dev
The app should now be running at http://localhost:3000.

## Video Demo
A 5-minute video demo of the system can be viewed on YouTube at: [Unlisted YouTube Video](https://youtu.be/SrEDqHuNfqE)

---
