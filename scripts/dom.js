import Contact from "./firebase/main.firebase.js";


const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const contactList = document.querySelector('#contact-list');
const createContactButton = document.querySelector('#create-contact-button');
const createContactDialog = document.querySelector('#create-contact');

let contactId;

window.addEventListener('load', async () => {
    let contacts = await Contact.getAll();
    const loader = document.querySelector('#loader');
    loader.classList.toggle('no-loader');
    
    contacts.forEach(contact => {
        contactList.querySelector('ul').innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" contact-id="${contact.id}" phone="${contact.data.phone}">${contact.data.name}</li>`
    });
});


const defaultFields = () => {
    createContactDialog.querySelector('i').style.visibility = 'hidden';
    createContactDialog.querySelectorAll('button')[0].textContent = 'Cancelar';
    createContactDialog.querySelectorAll('button')[1].textContent = 'Guardar';
    createContactDialog.querySelector('#name').value = '';
    createContactDialog.querySelector('#phone').value = '';
    createContactDialog.querySelector('span').textContent = `Nuevo Contacto`;
}

createContactButton.addEventListener('click', () => {
    createContactDialog.showModal();
    defaultFields();
    
})

createContactDialog.addEventListener('click', async (event) => {
    if (event.target && event.target.tagName === 'BUTTON' || event.target.tagName === 'I') {
        if (event.target.classList.contains('btn-primary') && event.target.textContent === 'Guardar') {
            Contact.save({
                name: createContactDialog.querySelector('#name').value, 
                phone: createContactDialog.querySelector('#phone').value
            })
            .then(() => window.location.reload());
        }
        if (event.target.classList.contains('btn-primary') && event.target.textContent === 'Editar') {
            Contact.update({
                id: contactId,
                name: createContactDialog.querySelector('#name').value, 
                phone: createContactDialog.querySelector('#phone').value
            })
            .then(() => window.location.reload());
        }
        
        if (event.target.classList.contains('btn-danger') && event.target.textContent === 'Cancelar' || event.target.classList.contains('fi-br-cross')) {
            createContactDialog.close();
            defaultFields();
        }
        if (event.target.classList.contains('btn-danger') && event.target.textContent === 'Eliminar') {
            await Contact.delete(contactId);
            window.location.reload();
        }
    }
});

contactList.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'LI') {
        contactId = event.target.getAttribute('contact-id');
        let contactName = event.target.textContent;
        let contactPhone = event.target.getAttribute('phone');
        createContactDialog.showModal();
        createContactDialog.querySelector('i').style.visibility = 'visible';
        createContactDialog.querySelectorAll('button')[0].textContent = 'Eliminar';
        createContactDialog.querySelectorAll('button')[1].textContent = 'Editar';
        let Name = contactName.split(' ').filter(n => n != '' && n != '\n').map(n => {if(n.endsWith('\n')){n[-1] = '';}return n}).join(' ');
        Name = Name.substr(0, Name.length-1);

        createContactDialog.querySelector('#name').value = Name;
        createContactDialog.querySelector('#phone').value = contactPhone;
        createContactDialog.querySelector('span').textContent = `Editar Contacto`
    }
})

