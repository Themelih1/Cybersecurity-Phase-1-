# OWASP Top 10 2025 - Summary & Training Notes

## Overview
The 2025 list reflects the evolving threat landscape, with a stronger emphasis on **Software Supply Chain Failures** and **Insecure Design**. A new category, **Mishandling of Exceptional Conditions**, has been introduced to address logical errors and improper failure handling.

---

### A01:2025 - Broken Access Control
*   **Description:** Restrictions on what authenticated users are allowed to do are not properly enforced. Attackers can exploit these flaws to access unauthorized functionality or data.
*   **Key Causes:** Modifying URL parameters, internal application state, user IDs (Insecure Direct Object References), or API requests. Missing access controls for POST, PUT, DELETE.
*   **Prevention:**
    * Deny by default.
    * Implement access control mechanisms once and reuse them throughout the application on the **server-side**.
    * Enforce record ownership. Log access control failures.
*   **Example Attack:** Changing the account number in a URL to view someone else's information: `https://example.com/app/accountInfo?acct=notmyacct`

---

### A02:2025 - Security Misconfiguration
*   **Description:** Insecure configuration of any part of the application stack, enabling unintended behavior or vulnerabilities.
*   **Key Causes:** Unnecessary features enabled, default accounts with unchanged passwords, verbose error messages revealing sensitive information, misconfigured security headers.
*   **Prevention:**
    * Implement a repeatable, automated **hardening** process for all environments.
    * Remove unused features, components, and documentation.
    * Review and update configurations for all security notes, updates, and patches.
*   **Example Attack:** Attacker exploits a known vulnerability in unused sample applications left on a production server.

---

### A03:2025 - Software Supply Chain Failures
*   **Description:** Breakdowns in the process of building, distributing, or updating software, often caused by vulnerabilities or malicious changes in third-party code, tools, or dependencies.
*   **Key Causes:** Using components with known vulnerabilities, unmaintained dependencies, lack of a Software Bill of Materials (SBOM), sourcing from untrusted repositories.
*   **Prevention:**
    * Maintain and manage a **Software Bill of Materials (SBOM)**.
    * Continuously scan and monitor for vulnerabilities in dependencies (e.g., using SCA tools).
    * Obtain components only from **official, trusted sources** over secure links. Prefer signed packages.
*   **Example Attack:** The SolarWinds attack or the GlassWorm attack, where malicious code was injected into a popular VS Code extension, compromising developers' machines.

---

### A04:2025 - Cryptographic Failures
*   **Description:** Failures related to lack of cryptography, weak cryptography, or leaking cryptographic keys, leading to exposure of sensitive data.
*   **Key Causes:** Use of broken or risky algorithms, weak random number generators, storing sensitive data in plaintext, improper certificate validation.
*   **Prevention:**
    * Encrypt all sensitive data **in transit** (with TLS) and **at rest**.
    * Store passwords using strong, adaptive, and salted hashing functions (Argon2, scrypt, bcrypt).
    * Use up-to-date and strong standard algorithms, protocols, and keys with proper key management.
*   **Example Attack:** Stealing a user's session cookie by downgrading an HTTPS connection to HTTP on an insecure network.

---

### A05:2025 - Injection
*   **Description:** An attacker sends hostile data to an interpreter, tricking it into executing unintended commands or accessing data without proper authorization.
*   **Key Causes:** User-supplied data is not validated, filtered, or sanitized. Use of dynamic queries or non-parameterized calls.
*   **Prevention:**
    * Use a safe API which avoids the interpreter entirely or provides a parameterized interface.
    * Use **parameterized queries (Prepared Statements)** or ORMs.
    * Validate and sanitize all user input on the server-side.
*   **Example Attack:** SQL Injection by entering `' OR '1'='1` into a login field to bypass authentication or extract data.

---

### A06:2025 - Insecure Design
*   **Description:** Represents different weaknesses expressed as "missing or ineffective control design." This is about flaws in the design and architecture, not implementation bugs. *"A secure design can still have implementation defects leading to vulnerabilities. An insecure design cannot be fixed by a perfect implementation."*
*   **Key Causes:** Lack of threat modeling, failure to define security requirements early, flawed business logic.
*   **Prevention:**
    * Perform **Threat Modeling** during the design phase.
    * Integrate security controls and language into user stories.
    * Use secure design patterns and reference architectures.
*   **Example Attack:** A credential recovery workflow that uses "questions and answers," which is prohibited by modern standards like NIST 800-63b.

---

### A07:2025 - Authentication Failures
*   **Description:** The application's authentication mechanism is incorrectly implemented, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users' identities.
*   **Key Causes:** Permits automated attacks (credential stuffing, brute force), use of weak or well-known passwords, weak credential recovery processes, insecure session management.
*   **Prevention:**
    * Where possible, implement **Multi-Factor Authentication (MFA)**.
    * Do not ship or deploy with any default credentials.
    * Align password policies with modern, evidence-based standards like NIST 800-63b (e.g., longer passwords over complex ones, no forced rotation).
*   **Example Attack:** Credential stuffing attacks using lists of known username/password pairs from other breaches.

---

### A08:2025 - Software or Data Integrity Failures
*   **Description:** The failure to verify the integrity of software, code, and data artifacts, making assumptions that they have not been tampered with.
*   **Key Causes:** Updates downloaded without sufficient integrity verification (e.g., lack of digital signatures), insecure deserialization, inclusion of functionality from untrusted sources.
*   **Prevention:**
    * Use **digital signatures** or similar mechanisms to verify the software or data is from the expected source and is unaltered.
    * Ensure the CI/CD pipeline has proper segregation, configuration, and access control.
    * Do not use unsigned or unencrypted serialized data from untrusted clients without integrity checks.
*   **Example Attack:** A router accepting unsigned firmware updates, allowing an attacker to push malicious firmware.

---

### A09:2025 - Logging & Alerting Failures
*   **Description:** Insufficient logging, monitoring, and alerting prevent the detection and response to active attacks and breaches.
*   **Key Causes:** Auditable events (logins, high-value transactions) are not logged, warnings and errors generate no logs, logs are not monitored for suspicious activity, no effective alerting thresholds.
*   **Prevention:**
    * Ensure all login, access control, and server-side input validation failures are **logged** with sufficient user context.
    * Protect log integrity from tampering (e.g., append-only tables).
    * Establish effective monitoring and **alerting** so suspicious activities are detected and responded to quickly.
*   **Example Attack:** A data breach goes undetected for years because the application did not log and monitor for unauthorized access patterns.

---

### A10:2025 - Mishandling of Exceptional Conditions - **NEW**
*   **Description:** The software does not properly handle unexpected conditions and errors, leading to crashes, unexpected behavior, and vulnerabilities like logic bugs, DoS, or information disclosure.
*   **Key Causes:** Uncaught exceptions, revealing sensitive information in error messages, not failing securely (failing open), improper rollback of transactions.
*   **Prevention:**
    * **Catch and handle** all exceptions gracefully. Log the event, show a generic message to the user, and **roll back transactions (fail closed)**.
    * Never expose stack traces or sensitive system details to the user.
    * Implement rate limiting and resource quotas to prevent some conditions.
*   **Example Attack:** An attacker causes a transaction to fail mid-way. If the system doesn't roll back completely (failing open), it could leave the application in an inconsistent state, potentially crediting funds without debiting them.

---

## Key Takeaways & Shifts in 2025

1.  **"Shift Left" Extends to "Pre-Code":** Security must be integrated into the **design phase (A06)** and **software supply chain (A03)**, not just during coding.
2.  **Trust, But Verify Your Dependencies:** Supply chain attacks (A03) are a top threat. Knowing your SBOM is no longer optional.
3.  **Access Control Remains Pervasive:** It's the most common and tested flaw (A01). Always enforce controls on the **server-side**.
4.  **Observe and Respond:** Without robust logging and alerting (A09), you are blind to attacks. Move from passive logging to active monitoring.
5.  **Design for Failure:** The new category A10 emphasizes that systems must behave securely even under unexpected conditions. **Always "fail closed"** where possible.
