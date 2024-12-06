export function determineUserType(mobile, password) {

    const customerUrl = 'http://localhost:8009/login/customer';
    const sellerUrl = 'http://localhost:8009/login/seller';

    // Prepare data for customer and seller
    const customerData = { mobileId: mobile, password: password };
    const sellerData = { mobile: mobile, password: password };

    // Helper function to make POST requests
    function postLogin(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response =>{
            console.log("res",response)
            return response.json()
        }     
            )
        .then(json => {

            if (json && json.userType) {
                console.log("json",json)
                console.log("token",json.token)
                localStorage.setItem('token',json.token)
                return json.userType;
            }
            throw new Error('Login failed');
        })
        .catch((e) => {
            console.log(e.message,e,"66666666")
        }); // In case of any error, return null
    }
  console.log("cust",customerUrl, customerData);
  console.log("seller",sellerUrl, sellerData)

    // Use Promise.all to attempt both logins
    return Promise.all([
        postLogin(customerUrl, customerData),
        postLogin(sellerUrl, sellerData)
    ]).then(results => {
        console.log("results",results)
        const [customerResult, sellerResult] = results;
        // Check which userType is returned
        if (customerResult) return customerResult; // 'customer'
        if (sellerResult) return sellerResult;     // 'seller'
        return 'User not recognized'; // None of the logins succeeded
    });
}

// Usage example
// determineUserType('9999999999', '999999999').then(userType => {
//     console.log('User Type:', userType);
// });
