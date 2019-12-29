let unordered_list = [];

// Bubblesort Algorithm
function orderArray(list) {
  let counter = 0;
  let flag = true;
  let checked_position = 0;
  while (flag == true) {
    flag = false
    for(let i = 0; i <= (list.length - checked_position); i++) {
      if (list[i + 1] > list[i]) {
        let temp = list[i + 1];
        list[i + 1] = list[i];
        list[i] = temp;
        flag = true;
        counter++
      };
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
function displayList(list ,type) {
  if(type === "unsorted") {
    let outputString = generateString(list)
    DOM.displayUnsorted.innerHTML = 
    `<ul> 
      ${outputString} 
    </ul>`
  } else {
    if(list.length === 0) {
      showError("Nothing to sort");
      return
    }
    let outputString = generateString(list)
    DOM.displaySorted.innerHTML = 
    `<ul>
    ${outputString}
    </ul>`
    showSuccess("List sorted")
  }
}

// Order the list 
function orderList() {
  let data = orderArray(unordered_list);
  displayList(data.list, "sorted")
  unordered_list = [];
  setTimeout(() => {
    DOM.number.value = "";
  }, 100);
}

// Add Number
function addNumber() {
  let number = parseFloat(DOM.number.value);
  if (!number) {
    showError("Your must type a number")
    return
  } 
  showSuccess("Number added to the list")
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
  DOM.success.display = "none";
  setTimeout(() => {
    DOM.error.style.display = "none";
  }, 1000)
}

// Show Success
function showSuccess(text) {
  DOM.error.display = "none";
  DOM.success.style.display = "block";
  DOM.success.textContent = text;
  setTimeout(() => {
    DOM.success.style.display = "none";
  }, 1000)
}

// Clear the list
function clearList() {
  unordered_list = [];
  DOM.displaySorted.innerHTML = "";
  DOM.displayUnsorted.innerHTML = "";
  showSuccess("List cleared");
}