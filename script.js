'use strict'
// ✅ validate input fields
const form = document.querySelector('form');
const displayErrorMarkup = function (ele, message) {
    ele.querySelector('.input-error').textContent = message;
    ele.querySelector('label').style.color = "var(--LightRed)";
    ele.querySelector('input').style.borderColor = 'var(--LightRed)';
}
const displayNormalMarkup = function () {
    document.querySelectorAll('.input-field').forEach(ele => {
        ele.querySelector('.input-error').textContent = "";
        ele.querySelector('label').style.color = "var(--SmokeyGrey)";
        ele.querySelector('input').style.borderColor = 'var(--SmokeyGrey)';
    });
}


const validate = function (ele) {
    let isValid = true;
    const input = ele.querySelector('input');
    if (input.getAttribute('id') === 'day') {
        if (input.value === "") {
            displayErrorMarkup(ele, "the field is required")
            isValid = isValid && false;
        } else {

            if (+input.value < 1 || +input.value > 31) {
                displayErrorMarkup(ele, 'Must be a valid day')
                isValid = isValid && false;
            }
        }
    }
    if (input.getAttribute('id') === 'month') {
        if (input.value === "") {
            displayErrorMarkup(ele, "the field is required")
            isValid = isValid && false;
        } else {
            if (+input.value < 1 || +input.value > 12) {
                displayErrorMarkup(ele, "Must be a valid month")
                isValid = isValid && false;
            }
        }

    }
    if (input.getAttribute('id') === 'year') {
        if (input.value === "") {
            displayErrorMarkup(ele, "the field is required")
            isValid = isValid && false;
        } else {
            if (+input.value > (new Date().getFullYear())) {
                displayErrorMarkup(ele, "Must be a valid past")
                isValid = isValid && false;
            }
        }
    }

    return isValid;
}
const calculateAge = function () {
    const endDate = new Date();

    const startDate = new Date([
        form.querySelector('input#year').value,
        form.querySelector('input#month').value,
        form.querySelector('input#day').value,

    ].join('-'));
    console.log(startDate);

    const oneDayMs = 1000 * 60 * 60 * 24;

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));
    return [years, days, months];

}
const displayAge = function (year, day, month) {
    // console.log(year, day, month);
    const yearEle = document.querySelector('.show-year');
    const monthEle = document.querySelector('.show-month');
    const dayEle = document.querySelector('.show-day');
    console.log(yearEle);
    yearEle.textContent = year;
    monthEle.textContent = month;
    dayEle.textContent = day;
    form.querySelectorAll('input').forEach(ele => ele.value = "");
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let x = true;
    form.querySelectorAll('.input-field').forEach(ele => {
        x = (validate(ele) && x);
        console.log(ele);
    })
    if (x) {
        const arr = calculateAge();
        displayAge(...arr);
    }


});
form.addEventListener('focusin', function (e) {
    e.preventDefault();
    const ele = e.target.closest('.input-field');
    console.log(ele);
    if (!ele) return;
    displayNormalMarkup();
})
// todo calculate age 
// todo show age on it's places
