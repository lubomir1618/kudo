"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../../common/validate");
const form = document.getElementById('form-user');
const loading = document.querySelector('.loading');
const API_URL = '/api/users';
const usersElement = document.querySelector('.allUsers');
function vodka() {
    loading.style.display = 'none';
    listAllUsers();
    form.addEventListener('submit', (event) => {
        var _a, _b;
        const formData = new FormData(form);
        const name = ((_a = formData.get('name')) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        const surname = ((_b = formData.get('surname')) === null || _b === void 0 ? void 0 : _b.toString()) || '';
        const user = {
            name,
            surname
        };
        if (!validate_1.isUserValid(user)) {
            return false;
        }
        console.log('user', user);
        form.style.display = 'none';
        loading.style.display = '';
        fetch(API_URL, {
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((createdUser) => {
            form.style.display = '';
            loading.style.display = 'none';
            form.reset();
            listAllUsers();
            console.log(createdUser);
        });
        event.preventDefault();
    });
    function listAllUsers() {
        fetch(API_URL, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((users) => {
            usersElement.textContent = '';
            users.reverse();
            users.forEach((user) => {
                const div = document.createElement('div');
                const header = document.createElement('h4');
                const surname = document.createElement('p');
                const created = document.createElement('small');
                header.textContent = user.name;
                surname.textContent = user.surname;
                created.textContent = new Date(user.created).toString();
                div.appendChild(header);
                div.appendChild(surname);
                div.appendChild(created);
                usersElement.appendChild(div);
            });
        });
    }
}
exports.vodka = vodka;
//# sourceMappingURL=client.js.map