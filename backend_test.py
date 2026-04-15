import requests
import sys
from datetime import datetime
import json

class ISHAPITester:
    def __init__(self, base_url="https://inclusive-gestures.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")

            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response": response.text[:200] if response.text else ""
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        success, response = self.run_test(
            "API Health Check",
            "GET",
            "",
            200
        )
        return success

    def test_create_contact(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91 9876543210",
            "company": "Test Company",
            "message": "This is a test message for ISH contact form"
        }
        
        success, response = self.run_test(
            "Create Contact Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and 'id' in response:
            print(f"   Created contact with ID: {response['id']}")
            return response['id']
        return None

    def test_get_contacts(self):
        """Test getting contact submissions"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} contact submissions")
            return True
        return False

def main():
    print("🚀 Starting ISH API Testing...")
    print("=" * 50)
    
    # Setup
    tester = ISHAPITester()
    
    # Run tests
    print("\n📡 Testing API Health...")
    if not tester.test_health_check():
        print("❌ API health check failed, stopping tests")
        return 1

    print("\n📝 Testing Contact Form...")
    contact_id = tester.test_create_contact()
    if not contact_id:
        print("❌ Contact creation failed")
    
    print("\n📋 Testing Contact Retrieval...")
    if not tester.test_get_contacts():
        print("❌ Contact retrieval failed")

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("⚠️  Some backend tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())