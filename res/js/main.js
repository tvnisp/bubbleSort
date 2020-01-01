let unordered_list = [];
document.querySelector('#descending').checked = true

// Bubblesort Algorithm
function orderArray(list, orderType) {
  let counter = 0;
  let flag = true;
  let checked_position = 0;
  while (flag == true) {
    flag = false
    for(let i = 0; i <= (list.length - checked_position); i++) {
      if (orderType === "descending") {
        if (list[i + 1] > list[i]) {
          let temp = list[i + 1];
          list[i + 1] = list[i];
          list[i] = temp;
          flag = true;
          counter++
        };
      } else if( orderType === "ascending") {
        if (list[i + 1] < list[i]) {
          let temp = list[i + 1];
          list[i + 1] = list[i];
          list[i] = temp;
          flag = true;
          counter++
        };
      }
    };
    checked_position ++
    };
    return {
      list: list,
      counter: counter
    }
};


  // Setup Selectors
const DOM = {
  number: document.querySelector(".number"),                    //Input
  orderList: document.querySelector(".orderList"),              //Sort button
  addNum: document.querySelector(".addNum"),                    //Add number button
  error: document.querySelector(".error"),                      //Error output
  success: document.querySelector(".success"),                  //Success output
  displaySorted: document.querySelector(".display_sorted"),     //Sorted list
  displayUnsorted: document.querySelector(".display_unsorted"), //Unsorted list
  clear: document.querySelector(".clear")                       //Clear list
}

// Event Listeners 
DOM.orderList.addEventListener("click", orderList)
DOM.addNum.addEventListener("click", addNumber);
DOM.clear.addEventListener("click", clearList);
document.addEventListener("keydown", event => {
  if(event.keyCode === 13 || event.which === 13 ){
    addNumber();
  };
  if(event.keyCode === 83 || event.which === 83) {
    orderList();
  }
  if(event.keyCode === 67 || event.which === 67) {
    clearList()
  }
});

// Display lists
function displayList(list ,type, orderType) {
  if(type === "unsorted") {
    let outputString = generateString(list)
    DOM.displayUnsorted.innerHTML = 
    `<ul class="list-style"> 
      ${outputString} 
    </ul>`
  } else {
    if(list.length === 0) {
      showError("Nothing to sort");
      return
    }
    let outputString = generateString(list)
    DOM.displaySorted.innerHTML = 
    `<ul class="list-style">
    ${outputString}
    </ul>`
    showSuccess(`List sorted in ${orderType} order, see bellow`)
  }
}

// Order the list 
function orderList() {
  var checkedRad = document.querySelector('input[name=orderType]:checked').id;
  let data = orderArray(unordered_list, checkedRad);
  displayList(data.list, "sorted", checkedRad)
  setTimeout(() => {
    DOM.number.value = "";
  }, 100);
}

// Add Number
function addNumber() {
  DOM.displaySorted.innerHTML = "Empty yet, You need to sort the list";
  let number = parseFloat(DOM.number.value);
  if (!number) {
    showError("Your must type a number")
    return
  } 
  showSuccess(`Number ${number} added to the list`)
  DOM.number.value = "";
  unordered_list.push(number);
  displayList(unordered_list, "unsorted")
}

// Generate output string
function generateString(list){
  let string = "";
  list.forEach((el) => {
    string += `<li> ${el} </li>`
  })
  return string
}

// Show Error
function showError(text) {
  DOM.error.textContent = text;
  DOM.error.style.display = "block";
  setTimeout(() => {
    DOM.error.style.display = "none";
  }, 1000)
}

// Show Success
function showSuccess(text) {
  DOM.success.textContent = text;
  DOM.success.style.display = "block";
  setTimeout(() => {
    DOM.success.style.display = "none";
  }, 1000)
}

// Clear the list
function clearList() {
  unordered_list = [];
  DOM.displaySorted.innerHTML = "Empty yet, You need to sort the list";
  DOM.displayUnsorted.innerHTML = "Empty yet, Add some numbers";
  showSuccess("List cleared");
}
