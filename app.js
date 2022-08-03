

let buttons = document.querySelectorAll('.input-button')
let input_preview_container = document.querySelector('#input-preview')
let input_container = document.querySelector('#input')

let TOTAL = 0;

let temp_num = ''

let inputs_data = []

for (const BTN of buttons) {

    BTN.addEventListener('click', CLICK_HANDLER)
}


document.onkeydown = KEYBOARD_HANDLER


function reset() {
    TOTAL = 0
    temp_num = ''
    inputs_data = []
    input_preview_container.innerHTML = `0`
    input_container.value = `0`
}


function KEYBOARD_HANDLER(e) {

    if (!e.key) return

    for (const BTN of buttons) {

        if (BTN.value == e.key) {
            BTN.click()
            break;
        }

    }

}
function CLICK_HANDLER(e) {

    let value = e.target.value
    let prev_data = input_preview_container.innerHTML



    let number = parseInt(value)

    if (value == 'C') {
        reset()
        return
    }
    if (value == '=') {

        inputs_data.push(temp_num)

        let res = calculate()

        reset()

        input_preview_container.innerHTML = res
        input_container.value = res

        temp_num = res

        return
    }

    if (number || number == 0) {

        input_preview_container.innerHTML += e.target.value
        temp_num += e.target.value

    }
    else {
        let last_item = prev_data.slice(prev_data.length - 1, prev_data.length)
        let number = parseInt(last_item)

        last_item = number || number == 0 ? last_item : ''


        input_preview_container.innerHTML = prev_data.slice(0, prev_data.length - 1) + last_item + value

        if (last_item) inputs_data.push(temp_num, value)
        else {
            if (inputs_data.length) inputs_data[inputs_data.length - 1] = value
            else inputs_data.push(value)
        }
        temp_num = ''
    }
}

function calculate() {

    // ['95', '*', '35', '-', '26', '+', '23', '*']


    let check_first_num = parseInt(inputs_data[0])



    if (!check_first_num && check_first_num != 0) {

        if (inputs_data[0] == '-') {
            inputs_data[0] = -parseInt(inputs_data[1])
        } else {
            inputs_data[0] = parseInt(inputs_data[1])
        }

        inputs_data.splice(1, 1)
    }


    let temp_total = 0

    for (let i = 1; i <= inputs_data.length; i++) {


        if (i == 1) {
            temp_total = parseInt(inputs_data[i - 1])
            continue
        }

        if (i % 2 != 0) {

            let operator = inputs_data[i - 2]
            let value = inputs_data[i - 1]

            if (operator == '+') temp_total += parseInt(value)
            else if (operator == '-') temp_total -= parseInt(value)
            else if (operator == '*') temp_total *= parseInt(value)
            else if (operator == '/') temp_total /= parseInt(value)

        }
    }


    return temp_total
}
