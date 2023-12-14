# Project Branch Readme

This branch contains features related to user authentication and the creation of DIDs (Decentralized Identifiers) and DWNs (Decentralized Web Numbers). The project is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **User Authentication:**

   - Signup for Patients and Practitioners.
   - Login for Patients and Practitioners.

2. **Decentralized Identifiers (DIDs) and Decentralized Web Numbers (DWNs):**
   - Creation of DIDs.
   - Creation of DWNs.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thasquirrie/medvaultz.git
   ```

1. Navigate to the project directory:

```bash
  cd medvaultz
```

2. Install dependencies:

```bash
  npm install
```

## Usage

Describe how to run and use the project. Include any specific steps or commands necessary to get the application running.

### Endpoints

Signup:

POST /api/signup/patient: Signup for patients.
POST /api/signup/practitioner: Signup for practitioners.
Login:

POST /api/login/patient: Login for patients.
POST /api/login/practitioner: Login for practitioners.
Decentralized Identifiers (DIDs) and Decentralized Web Numbers (DWNs):

POST /api/create-did: Create a DID.
POST /api/create-dwn: Create a DWN.
