// Add user into LS (users)
function signup() {
    //return all objects into users key from LS 
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstName = document.getElementById("firstName").value;
    verification("firstNameError", "First name must have at least 3 chars", firstName.length < 3);
    var lastName = document.getElementById("lastName").value;
    verification("lastNameError", "Last name must have at least 5 chars", lastName.length < 5);
    var email = document.getElementById("email").value;
    verification("emailError", "Email exist", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwd").value;
    verification("pwdError", "Last name must be between 6 and 12", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("tel").value;
    verification("telError", "Tel must be correct", tel.length > 8)
    if (
        firstName.length >= 3 &&
        lastName.length >= 5 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        // creat JSON Object
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            role: "client"
        };

        // save object into DB 
        // localStorage.setItem ("users", JSON.stringify(user));

        // insert user object into array 
        usersTab.push(userObj);
        // users = [{},{},{},]
        localStorage.setItem("users", JSON.stringify(usersTab));
    }

}

function signupAdmin () {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstName = document.getElementById("firstNameAdminID").value;
    verification("firstNameError", "First name must have at least 3 chars", firstName.length < 3);
    var lastName = document.getElementById("lastNameAdminID").value;
    verification("lastNameError", "Last name must have at least 5 chars", lastName.length < 5);
    var email = document.getElementById("emailAdminID").value;
    verification("emailError", "Email exist", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwdAdminID").value;
    verification("pwdError", "Last name must be between 6 and 12", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("telAdminID").value;
    verification("telError", "Tel must be correct", tel.length > 8)
    if (
        firstName.length >= 3 &&
        lastName.length >= 5 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            role : "admin"
        };
        usersTab.push(userObj);
        localStorage.setItem("users", JSON.stringify(usersTab));
     }
}

function signupShipper () {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstName = document.getElementById("firstNameShipperID").value;
    verification("firstNameError", "First name must have at least 3 chars", firstName.length < 3);
    var lastName = document.getElementById("lastNameShipperID").value;
    verification("lastNameError", "Last name must have at least 5 chars", lastName.length < 5);
    var email = document.getElementById("emailShipperID").value;
    verification("emailError", "Email exist", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwdShipperID").value;
    verification("pwdError", "Last name must be between 6 and 12", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("telShipperID").value;
    verification("telError", "Tel must be correct", tel.length > 8)
    if (
        firstName.length >= 3 &&
        lastName.length >= 5 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            role : "shipper"
        };
        usersTab.push(userObj);
        localStorage.setItem("users", JSON.stringify(usersTab));
     }
}

// Function that displays error med=ssage into span
function verification(spanId, msg, condition) {
    if (condition) {
        document.getElementById(spanId).innerHTML = msg;
        document.getElementById(spanId).style.color = "red";
    }
    else {
        document.getElementById(spanId).innerHTML = "";
    }

}

function addproduct() {
    var productName = document.getElementById("productNameId").value;
    verification("productNameError", "Product Name must have at least 3 chars", productName.length < 3);
    var price = document.getElementById("priceId").value;
    verification("priceError", "Price must be greater then 0", Number(price) <= 0);
    var category = document.getElementById("categoryId").value;
    verification("categoryError", "Category must have at least 6 chars", category.length < 6);
    var stock = document.getElementById("stockId").value;
    verification("stockError", "Stock must be greater then 10 ", Number(stock) < 10);
    if (
        productName.length >= 3 &&
        Number(price) > 0 &&
        category.length >= 6 &&
        Number(stock) >= 10
    ) {
        //get all products from LS 
        var productsTab = JSON.parse(localStorage.getItem("products") || "[]");
        var connectedUser = localStorage.getItem("connectedUser");
        // create product object
        var prod = {
            id: maxId(productsTab) + 1,
            productName: productName,
            price: price,
            category: category,
            stock: stock,
            idUser: connectedUser,
        } 
        };
   
        //add productTAb into LS
        productsTab.push(prod);
        localStorage.setItem("products", JSON.stringify(productsTab));
        // Go to index page 
        location.replace("mySpace.html");
    }

//check if email exists into Array
function checkEmail(T, ch) {
    var emailExist = false;
    for (let i = 0; i < T.length; i++) {
        if (T[i].email == ch) {
            emailExist = true;
            break;
        }
    }
    console.log("Email variable", emailExist);
    return emailExist;
}

// Display All Products Function 
function displayAllProducts() {
    var productsTab = getFromLS("products");
    var result = "";
    for (let i = 0; i < productsTab.length; i++) {
        result = result +
            `<tr>
        <td>${productsTab[i].productName}</td>
        <td>${productsTab[i].price}</td>
        <td>${productsTab[i].stock}</td>
        <td>${productsTab[i].category}</td>
        <td>
         <button class = "btn btn-success">Display</button>
         <button class="btn btn-warning">Edit</button>
         <button class="btn btn-danger">Delete</button>
        </td>
        </tr>;`
    }
    console.log("here result", result);
    document.getElementById("productstable").innerHTML = result;

}

function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function showProducts() {
    var productsTab = getFromLS("products");
    var result = "";
    for (let i = 0; i < productsTab.length; i++) {
        result += `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${productsTab[i].productName}</h6>
									<div class="price">
										<h6>${productsTab[i].price}$</h6><br>
										<h6>${productsTab[i].stock} pieces </h6>
									</div>
									
								</div><button onclick = "goToProductInfo(${productsTab[i].id})" class ="btn btn-warning">Order</button>
							</div>
						</div>`
    }
    document.getElementById("productsBloc").innerHTML = result;
}

function goToProductInfo(productId) {
    localStorage.setItem("prId", productId);
    location.replace("productDetails.html");
}

function maxId(T) {
    var max;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;
            }
        }
    }
    return max;
}

function idSignup() {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");

    var result = "";
    for (let i = 0; i < usersTab.length; i++) {
        result = result +
            `<tr>
        <td>${usersTab[i].id}</td>
        <td>${usersTab[i].firstName}</td>
        <td>${usersTab[i].lastName}</td>
        <td>${usersTab[i].email}</td>
        <td>
         <button class="btn btn-warning">Edit</button>
         <button class="btn btn-danger">Delete</button>
        </td>
        </tr>;`
    }
    console.log("here result", result);
    document.getElementById("userstable").innerHTML = result;

}

function displayProductDetails() {
    //Get ID from LS        
    var idP = localStorage.getItem("prId");
    //Get all products objects from LS 
    var productsTab = getFromLS("products");
    // Initialize var 
    var product = {};
    // Search product by ID 
    for (let i = 0; i < productsTab.length; i++) {
        if (productsTab[i].id == idP) {
            product = productsTab[i];
            break;
        }
    }
    console.log("HERE FINDED", product);
    document.getElementById("prName").innerHTML = product.productName;
    document.getElementById("prPrice").innerHTML = product.price;
    document.getElementById("prCategory").innerHTML = product.category;
}

function addToCart() {
    var qty = document.getElementById("qtyId").value;
    var idP = localStorage.getItem("prId");
    //Get all products objects from LS 
    var productsTab = getFromLS("products");
    // Initialize var 
    var product = {};
    // Search product by ID 
    for (let i = 0; i < productsTab.length; i++) {
        if (productsTab[i].id == idP) {
            product = productsTab[i];
            break;
        }
    }
    if (Number(product.stock) >= Number(qty) && Number(qty) > 0) {
        var orders = getFromLS ("orders");
        var connectedUser = localStorage.getItem("connectedUser");
        var productId = localStorage.getItem("prId");
        var order = {
            id: maxId(orders) + 1,
            idProduct: productId,
            idUser: connectedUser,
            qty: qty
        };
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        //Update stock qty
        //get all products from LS 
        var products = getFromLS("products");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == productId) {
                products[i].stock = Number(products[i].stock)- Number(qty);
                break;
            }
        }
        localStorage.setItem("products", JSON.stringify(products));
        location.replace("basket.html");
    } else {
        document.getElementById("qtyError").innerHTML = "Not Available";
    }
}

function login() {
    var usersTab = getFromLS("users");
    var email = document.getElementById("userEmail").value;
    var pwd = document.getElementById("userPwd").value;
    var isLoggedIn = false;
    var role ;
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email && usersTab[i].pwd == pwd)
        {
            localStorage.setItem("connectedUser", usersTab[i].id);
            isLoggedIn = true;
            role = usersTab[i].role;
            break;
        }
    }
    if (isLoggedIn) {
        if (role == "admin") {
            location.replace("admin.html");
        } else if (role == 'shipper')
           location.replace("mySpace.html")
           else {
            location.replace("showproducts.html");
        }
        
    } else {
        document.getElementById("userError").innerHTML = "Please check Email/Pwd"
    }

}

function myOrders() {
    var orders = getFromLS ("orders");
    var connectedUser = localStorage.getItem("connectedUser");
    var myOrdersTab = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser) {
            myOrdersTab.push(orders[i]);
        }
    }
    console.log("here my orders",myOrdersTab);
    var result = "";
    for (let i = 0; i < myOrdersTab.length; i++) {
        result += `
        <tr> 
        <td>${ myOrdersTab[i].id}</td>
        <td>${ myOrdersTab[i].qty}</td>
        <td>${ myOrdersTab[i].idProduct}</td>
        <td>${serachProductByID(myOrdersTab[i].idProduct).productName}</td>
        <td>${serachProductByID(myOrdersTab[i].idProduct).price}</td>
        <td>
         <button class="btn btn-danger" onclick="deleteOrder(${ myOrdersTab[i].id})">Delete</button>
        </td>
        <tr>
       `
    }
    console.log("result", result);
    document.getElementById("myOrderId").innerHTML = result;
}

// Search Product By ID 
function serachProductByID(id) {
    var products = getFromLS("products");
    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id== id) {
            findedProduct = products[i];
            break;
        }
        
    }
    return findedProduct;
    
}

function deleteOrder(id) {
 // Get all Orders
 var ordersTab = getFromLS ("orders");
 var obj;
 for (let i = 0; i < ordersTab.length; i++) {
    obj = ordersTab[i];
   if (ordersTab[i].id == id) {
    ordersTab.splice(i,1);
    break;
   }
 }

 // MAJ product stock
 var productsTab = getFromLS("products");
 for (let i = 0; i < productsTab.length; i++) {
    if (productsTab[i].id == obj.idProduct){
        productsTab[i].stock += Number(obj.qty);
        break;
    }
 }
 localStorage.setItem("products",JSON.stringify(productsTab));
 localStorage.setItem("orders",JSON.stringify(ordersTab));
 location.reload();
}

function generateHeader() {
    var connectedUser = localStorage.getItem("connectedUser");
    //  var usersTab = getFromLS ("orders");
    // for (let i = 0; i < usersTab[i].length; i++) {
       // if (usersTab[i].id == connectedUser) {
            //findedUser = usersTab[i];
            //break;
       // }
    //}
    var findedUser = searchObjectById (connectedUser,"users");
    var result = "";
    if (connectedUser) {
        if (findedUser.role == "admin") {
        result = `
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Products</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Basket</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Welcome ${findedUser.firstName} ${findedUser.lastName}</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="admin.html">Admin</a></li>
            <li class="nav-item"><a class="nav-link" onclick ="logout()">Logout</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`
    } 
    else{
        result = `
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Products</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Basket</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Welcome ${findedUser.firstName} ${findedUser.lastName}</a></li>
        <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
        <li class="nav-item"><a class="nav-link" onclick ="logout()">Logout</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`
} 
    }

    else {
        result = `
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Products</a></li>
        <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Signup</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`

    }
    document.getElementById("headerID").innerHTML = result;
}

// Generic function that search objet By ID from KEY 
function searchObjectById (idObj, key) {
    var tab = getFromLS(key);
    var findedObject;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == idObj) {
            findedObject = tab[i];
            break;
        }
        
    }
    return findedObject;
       
}

function profile(){
    var connectedUser = localStorage.getItem("connectedUser");
    var user = searchObjectById(connectedUser,"users");
    console.log("here finded user", user)
    document.getElementById("fNameId").innerHTML = user.firstName;
    document.getElementById("lNameId").innerHTML = user.lastName;
    document.getElementById("emailId").innerHTML = user.email;
    document.getElementById("telId").innerHTML = user.tel;
}

function generateUsers() {
    var usersTab = getFromLS("users");
    var result = "";
    for (let i = 0; i < usersTab.length; i++) {
        result = result +
            `<tr>
        <td>${usersTab[i].firstName}</td>
        <td>${usersTab[i].lastName}</td>
        <td>${usersTab[i].email}</td>
        <td>${usersTab[i].tel}</td>
        <td>
         <button class = "btn btn-success">Display</button>
         <button class="btn btn-warning">Edit</button>
         <button class="btn btn-danger">Delete</button>
        </td>
        </tr>;`
    }
    console.log("here result", result);
    document.getElementById("allUsers").innerHTML = result;
}

function generateProducts () {
    var productsTab = getFromLS("products");
    var result = "";
    for (let i = 0; i < productsTab.length; i++) {
        result = result +
            `<tr>
        <td>${productsTab[i].productName}</td>
        <td>${productsTab[i].price}</td>
        <td>${productsTab[i].stock}</td>
        <td>${productsTab[i].category}</td>
        <td>
         <button class = "btn btn-success">Display</button>
         <button class="btn btn-warning" onclick="editProduct(${productsTab[i].id})">Edit</button>
         <button class="btn btn-danger">Delete</button>
        </td>
        </tr>;`
    }
    console.log("here result", result);
    document.getElementById("allProducts").innerHTML = result;

}

function generateOrders () {
    var ordersTab = getFromLS ("orders");
    var result = "";
    for (let i = 0; i < ordersTab.length; i++) {
        result += `
        <tr> 
        <td>${ ordersTab[i].id}</td>

        <td>${ ordersTab[i].qty}</td>
        
        <td>${searchObjectById(ordersTab[i].idProduct,"products").productName}</td>
        <td>${searchObjectById(ordersTab[i].idProduct,"products").price}</td>
        <td>${searchObjectById(ordersTab[i].idUser,"users").firstName}</td>
        <td>${searchObjectById(ordersTab[i].idUser,"users").lastName}</td>
        <td>${searchObjectById(ordersTab[i].idUser,"users").tel}</td>
        <td>${ordersTab[i].qty * searchObjectById(ordersTab[i].idProduct,"products").price}}</td>
        <td>
        <button class = "btn btn-success">Display</button>
        <button class="btn btn-warning">Edit</button>
        <button class="btn btn-danger">Delete</button>
       </td>
       </tr>;`
       
    }
    console.log("result", result);
    document.getElementById("allOrders").innerHTML = result;

}

function logout() {
    localStorage.removeItem("connectedUser");
    location.replace("index.html");
    
}

function editProduct(id) {
   var product = searchObjectById(id,"products")
   var editForm = `
   <div class="col-md-12 form-group">
     <input type="text" class="form-control" value="${product.productName}" id="newName">
   </div>
   <div class="col-md-12 form-group">
    <input type="number" class="form-control" value="${product.stock}" id="newStock">
   </div>
   <div class="col-md-12 form-group">
    <input type="number" class="form-control" value="${product.price}" id="newPrice">
   </div>
   <div class="col-md-12 form-group">
    <button type="submit" class="primary-btn" onclick="validate(${product.id})">Validate</button>
    </div>`
    document.getElementById("editFormId").innerHTML= editForm;
}

function validate(id) {
    var newName = document.getElementById("newName").value;
    var newStock = document.getElementById("newStock").value;
    var newPrice = document.getElementById("newPrice").value;
    var productsTab = getFromLS ("products");
    for (let i = 0; i < productsTab.length; i++) {
       if (productsTab[i].id == id) {
          productsTab[i].productName = newName;
          productsTab[i].stock = newStock;
          productsTab[i].price = newPrice;
          break;
        }
           
       }
   
    localStorage.setItem("products",JSON.stringify(productsTab));
    location.reload();
}

function shipperProducts() {
    var productsTab = getFromLS("products");
    var connectedUser = localStorage.getItem("connectedUser");
    var result = "";
    for (let i = 0; i < productsTab.length; i++) {
        if (connectedUser == productsTab[i].idUser){
        result = result +
            `<tr>
        <td>${productsTab[i].productName}</td>
        <td>${productsTab[i].price}</td>
        <td>${productsTab[i].stock}</td>
        <td>${productsTab[i].category}</td>
        <td>
         <button class = "btn btn-success">Display</button>
         <button class="btn btn-warning" onclick="editProduct(${productsTab[i].id})">Edit</button>
         <button class="btn btn-danger">Delete</button>
        </td>
        </tr>;`
    }
}
    document.getElementById("productsTableShipper").innerHTML = result; 
}
