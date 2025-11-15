# Security Review & AWS Deployment Recommendations

## Fixed Issues

### 1. **Tabnabbing/Reverse Tabnabbing Vulnerability** (FIXED)
- **Issue**: External links with `target="_blank"` without `rel="noopener noreferrer"` allow malicious sites to access `window.opener`
- **Fix Applied**: Added `rel="noopener noreferrer"` to all external links
- **Impact**: Prevents tabnabbing attacks where malicious sites can redirect your site

## Security Headers (AWS Configuration Required)

When deploying to AWS (S3 + CloudFront), configure these security headers:

### Recommended Security Headers:

1. **Content-Security-Policy (CSP)**
   ```
   default-src 'self'; 
   script-src 'self'; 
   style-src 'self'; 
   img-src 'self' data:; 
   font-src 'self'; 
   connect-src 'self'; 
   frame-ancestors 'none';
   ```

2. **X-Frame-Options**
   ```
   X-Frame-Options: DENY
   ```
   Prevents clickjacking attacks

3. **X-Content-Type-Options**
   ```
   X-Content-Type-Options: nosniff
   ```
   Prevents MIME type sniffing

4. **Strict-Transport-Security (HSTS)**
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```
   Forces HTTPS connections

5. **X-XSS-Protection** (Legacy browsers)
   ```
   X-XSS-Protection: 1; mode=block
   ```

6. **Referrer-Policy**
   ```
   Referrer-Policy: strict-origin-when-cross-origin
   ```
   Controls referrer information

7. **Permissions-Policy**
   ```
   Permissions-Policy: geolocation=(), microphone=(), camera=()
   ```
   Disables unnecessary browser features

## AWS-Specific Security Recommendations

### 1. **S3 Bucket Security**
- [ ] Enable **S3 Block Public Access** (except for CloudFront access)
- [ ] Use **S3 bucket policies** to restrict access to CloudFront OAI/OAC only
- [ ] Enable **S3 versioning** and **S3 access logging**
- [ ] Use **KMS encryption** for S3 bucket at rest
- [ ] Remove public read/write ACLs

### 2. **CloudFront Distribution**
- [ ] Force **HTTPS only** (Redirect HTTP to HTTPS)
- [ ] Use **AWS Certificate Manager (ACM)** for SSL/TLS certificates
- [ ] Configure **CloudFront Response Headers Policy** for security headers
- [ ] Enable **CloudFront access logging**
- [ ] Use **CloudFront Origin Access Identity (OAI)** or **Origin Access Control (OAC)** to restrict S3 access
- [ ] Configure **WAF (Web Application Firewall)** rules if needed

### 3. **HTTPS Enforcement**
- [ ] Set up SSL/TLS certificate via ACM
- [ ] Configure CloudFront to redirect HTTP → HTTPS
- [ ] Enable HSTS header (via CloudFront Response Headers)

### 4. **Monitoring & Logging**
- [ ] Enable **CloudWatch Logs** for CloudFront
- [ ] Set up **CloudWatch Alarms** for suspicious activity
- [ ] Monitor **S3 access logs** for unauthorized access
- [ ] Enable **AWS Config** to track configuration changes

## Code Security Analysis

### No Vulnerabilities Found:
- **No XSS vulnerabilities** - All content is static HTML, no user input
- **No SQL injection risks** - No database or server-side code
- **No command injection** - No server-side execution
- **Safe JavaScript usage** - Uses `.textContent` (not `.innerHTML`) - safe from XSS
- **No external script loading** - All scripts are local
- **No form submissions** - No data collection forms

### Low Risk Items:
1. **Email address exposure** - `mailto:` link exposes email (acceptable for portfolio)
2. **Placeholder links** - Some `<a href="#">` links (not a security risk, just UX)
3. **No input validation needed** - Static site, no user input handling

## Pre-Deployment Checklist

- [x] Add `rel="noopener noreferrer"` to external links
- [ ] Configure CloudFront Response Headers Policy
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure S3 bucket with proper access controls
- [ ] Enable CloudFront access logging
- [ ] Test site on HTTPS
- [ ] Verify security headers using [SecurityHeaders.com](https://securityheaders.com)
- [ ] Run security scan using tools like [Mozilla Observatory](https://observatory.mozilla.org)

## AWS CloudFront Response Headers Policy Setup

When creating your CloudFront distribution, add a Response Headers Policy with:

**Security Headers:**
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- Referrer-Policy: strict-origin-when-cross-origin

## Overall Security Status

**Risk Level: LOW**

This is a static portfolio website with no user input, no database, and no server-side code. The main security considerations are:
1. Proper AWS configuration (S3 + CloudFront)
2. HTTPS enforcement
3. Security headers (via CloudFront)
4. External link protection (already fixed)

The code itself has no critical security vulnerabilities.
