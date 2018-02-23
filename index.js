'use strict';


//THIS IS ALL WRONG I WILL WORK ON THIS OVER THE WEEKEND
const STORE = {
  items: [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ],

  displayAll: false
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {//another version
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}

function filterObject(arr) {
  let arr2 = arr;

  arr2.forEach(function(element, index){

    if(element.checked === true){
      arr2.splice(index, 1);
    }

  });

  return arr2;
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  let data;
  
  if(STORE.displayAll === true) {
    data = STORE.items;
    console.log(data);
  } else if(STORE.displayAll === false) {
    data = filterObject(STORE.items);
    console.log(data);
  }
  const shoppingListItemsString = generateShoppingItemsString(data);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}



function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

// function doSomethingToShoppingList(disCk) {
//   if(!disCk) {
//     //Display checked true
//   } else {
//     //Remove cheked true 
//   }
// }

function addTheCheck(val) {
  STORE.displayAll = val;
  console.log(STORE.displayAll);
}

//HANDLE

function handleDisplayCheck() {

  let boolCheck = false;

  $('#js-shopping-list-form').change(function(){
    const newCheckVal = $('.js-display-list');
    
    if(newCheckVal.is(':checked')) {
      boolCheck = true;
    } else {
      boolCheck = false;
    }

    addTheCheck(boolCheck);
    renderShoppingList();
  })
}



function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function removeItemShoppingList(itemIndex) {
  console.log(`Deliting item ${itemIndex} from the list`)
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    removeItemShoppingList(itemIndex);
    renderShoppingList();
  });
}



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayCheck();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
