let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;



// get total 
function Total() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
}

// create product

let data_Product = [];
if (localStorage.Product != null) {
    data_Product = JSON.parse(localStorage.Product);
}

function creat() {
    let new_pro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // count
    if (title.value != '' && price.value != '' && count.value <= 200) {
        if (mood === 'create') {
            if (new_pro.count > 1) {
                for (let i = 0; i < new_pro.count; i++) {
                    data_Product.push(new_pro);
                }
            } else {
                data_Product.push(new_pro);
            }
        }
        else {
            data_Product[tmp] = new_pro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
            total.style.backgroundColor = 'red';
        }

    }


    localStorage.setItem('Product', JSON.stringify(data_Product));

    clear_data();
    read_data()
}

// clear inputs 
function clear_data() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read data 
function read_data() {

    let table = '';

    for (let i = 0; i < data_Product.length; i++) {
        table += `
                            <tr>
                        <td>${[i + 1]}</td>
                        <td>${[data_Product[i].title]}</td>
                        <td>${[data_Product[i].price]}</td>
                        <td>${[data_Product[i].taxes]}</td>
                        <td>${[data_Product[i].ads]}</td>
                        <td>${[data_Product[i].discount]}</td>
                        <td>${[data_Product[i].total]}</td>
                        <td>${[data_Product[i].category]}</td>
                        <td><button onclick="update_data(${i})">update</button></td>
                        <td><button onclick="delete_data(${i})">delete</button></td>
                    </tr>`;

    }
    document.getElementById('tbody').innerHTML = table;
    // delete All 
    let btn_del = document.getElementById('deleteAll');
    if (data_Product.length > 0) {
        btn_del.innerHTML = `
        <button onclick = "deleteAll()">delete All (${data_Product.length})</button>`
    } else {
        btn_del.innerHTML = '';
    }
    Total();
};

read_data();



// delete 
function delete_data(ID_pro) {
    data_Product.splice(ID_pro, 1);
    localStorage.Product = JSON.stringify(data_Product);

    read_data()
}

// deleteAll 
function deleteAll() {
    localStorage.clear();
    data_Product.splice(0);
    read_data();
}


// update 
function update_data(ID_up) {
    title.value = data_Product[ID_up].title;
    price.value = data_Product[ID_up].price;
    taxes.value = data_Product[ID_up].taxes;
    ads.value = data_Product[ID_up].ads;
    discount.value = data_Product[ID_up].discount;
    Total();
    count.style.display = 'none';
    category.value = data_Product[ID_up].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = ID_up;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}


// search 

let search_mood = 'title';
function search_Mood(id) {

    let search = document.getElementById('Search');
    if (id === 'searchtitle') {
        search_mood = 'title';

    } else {
        search_mood = 'category';

    }
    search.placeholder = 'Search By ' + search_mood;
    search.focus();

}

function search_data(value) {

    let table = '';
    for (let i = 0; i < data_Product.length; i++) {
        if (search_mood == 'title') {
            if (data_Product[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${[i + 1]}</td>
                    <td>${[data_Product[i].title]}</td>
                    <td>${[data_Product[i].price]}</td>
                    <td>${[data_Product[i].taxes]}</td>
                    <td>${[data_Product[i].ads]}</td>
                    <td>${[data_Product[i].discount]}</td>
                    <td>${[data_Product[i].total]}</td>
                    <td>${[data_Product[i].category]}</td>
                    <td><button onclick="update_data(${i})">update</button></td>
                    <td><button onclick="delete_data(${i})">delete</button></td>
                </tr>`;
            }
        }
        else {

            if (data_Product[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${[i + 1]}</td>
                    <td>${[data_Product[i].title]}</td>
                    <td>${[data_Product[i].price]}</td>
                    <td>${[data_Product[i].taxes]}</td>
                    <td>${[data_Product[i].ads]}</td>
                    <td>${[data_Product[i].discount]}</td>
                    <td>${[data_Product[i].total]}</td>
                    <td>${[data_Product[i].category]}</td>
                    <td><button onclick="update_data(${i})">update</button></td>
                    <td><button onclick="delete_data(${i})">delete</button></td>
                </tr>`;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}
