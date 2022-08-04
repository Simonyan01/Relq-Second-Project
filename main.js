const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelect('[dat-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


class Calculator { // Այս դասում մենք կդնենք կոնստրուկտոր, որը կվերցնի դրա համար բոլոր մուտքերը և հաշվիչի բոլոր գործառույթները:
    constructor(previousOperandTextElement, currentOperandTextElement) {//Այս կոնստրուկտորը պատրաստվում է վերցնել նախորդ OperandTextElement-ը և ընթացիկ OperandTextElement-ը, որպեսզի մենք կարողանանք որոշել, թե որտեղ տեղադրենք ցուցադրվող տեքստը մեր հաշվիչի համար:
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //Հենց որ մենք ստեղծենք հաշվիչը, մենք պետք է կոչենք this.clear ֆունկցիան, քանի որ մենք պետք է զրոյացնենք մուտքերը:
    }

    // մենք պետք է սահմանենք տարբեր գործողություններ, որոնք կկատարի հաշվիչը: Առաջինը clear() ֆունկցիան է, որը կջնջի բոլոր տարբեր փոփոխականները:


    clear() {
        // clear() ֆունկցիան կջնջի բոլոր ցուցադրված արժեքները: Մենք պետք է այս ընթացիկ արժեք-ը դնենք դատարկ տողի վրա, եթե ելքի արժեքները հեռացվեն: Նույնը կարող ենք անել նաև նախորդ արժեքի համար։
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Հաջորդ մեթոդը delete()-ն է՝ մեկ համարը մաքրելու համար:


    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Մենք նաև կստեղծենք ֆունկցիա, որը որոշում է, թե ինչ կլինի ամեն անգամ, երբ օգտատերը սեղմում է թվի վրա՝ ավելացնելու համար, որը կոչվում է appendNumber(համար):

    //Հաջորդը, եկեք գրենք appendNumber() ֆունկցիան: Մեզ անհրաժեշտ է միայն թարմացնել գործող օպերանդի արժեքը և ավելացնել համարը: Մենք կարող ենք օգտագործել this.currentOperand և այն վերածել տողի, եթե այն թիվ է: Այս կերպ մենք հեշտությամբ կարող ենք վերջում ինչ-որ բան ավելացնել՝ օգտագործելով «+»:
    appendNumber(number) {

        //Մենք պետք է թվերը փոխարկենք տողի, որպեսզի թույլ չտանք, որ կոմպիլյատորը կատարի իրական գործողությունը: Երբ պահում ենք ֆայլը և սեղմում թվերի վրա, տեսնում ենք, որ դրանք անընդհատ ավելացվում են ցուցակում: Սակայն կետ(.) նշանը նույնպես ավելացվում է սեղմելիս:

        //Մենք կարող ենք դա կանխել՝ ստուգելով, թե արդյոք ելքային թվերի տողը ներառում է կետ(.), ապա վերադարձնել: Սա կկանգնեցնի ձեր գործառույթի հետագա կատարումը: Այժմ, եթե փորձեք ավելացնել մի քանի ժամանակաշրջան, այն կավելացնի միայն մեկը:
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }



    // Մեզ պետք է chooseOperation(operation) ֆունկցիա, որը վերահսկում է, թե ինչ կլինի ցանկացած ժամանակ, երբ օգտատերը սեղմի որևէ գործողության կոճակը:

    // Մենք պետք է օգտագործենք նույն տեխնիկան, որը կիրառել ենք գործառնական կոճակների թվերի կոճակների վրա: Այնուամենայնիվ, appendNumber-ի փոխարեն մենք կօգտագործենք chooseOperation(button.innerText) և կթարմացնենք էկրանը՝ օգտագործելով calculator.updateDisplay:
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    // compute() ֆունկցիան վերցնում է ձեր հաշվիչի ներսում գտնվող արժեքները և ցուցադրում արդյունքը:


    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // updateDisplay() ֆունկցիան թույլ է տալիս թարմացնել ելքի ներսում գտնվող արժեքները:

    //Ստուգենք այն ամենը, ինչ մենք գրել ենք, և տեսնենք աշխատու՞մ է արդյոք․․․ updateDisplay() ֆունկցիայի ներսում ավելացնեք this.currentOperandTextElement.innerText = this.currentOperand:
    //appendNumber() ֆունկցիայի ներսում մենք կփոխենք նաև ընթացիկ օպերանդը, որպեսզի համապատասխանի այդ թվին, ոչ թե թիվը կցվի:


    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
}

// մենք պետք է ստեղծենք  հաշվիչի հաստատուն և այն նոր հաշվիչի վրա դնենք , այնուհետև մենք ամեն ինչ կոնստրուկտորից փոխանցում ենք դրան: 
const MyCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement)



//Մենք կընտրենք թվային կոճակ, այնուհետև կօգտագործենք for.each հայտարարությունը՝ այս բոլոր տարբեր կոճակների վրա պտտելու համար: Մենք կարող ենք նաև կոճակների վրա ավելացնել EventListener՝ օգտագործելով button.addEventListener: EventListener-ը կկանչի ինչ-որ բան, երբ կոճակը սեղմվում է։
//Այս դեպքում մենք միայն թիվ կավելացնենք հաշվիչին։ Դա կարելի է անել՝ կանչելով appendNumber ֆունկցիան և օգտագործելով button.innerText՝ այն ցուցադրելու համար:
//Երբ դա կատարվի, մենք պետք է կանչենք calculator.updateDisplay մեթոդը՝ դրանով իսկ համոզվելով, որ ցուցադրվող արժեքները մշտապես թարմացվում են ամեն անգամ, երբ սեղմում ենք հաշվիչի կոճակը:

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        MyCalculator.appendNumber(button.innerText)
        MyCalculator.updateDisplay()

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        MyCalculator.chooseOperation(button.innerText)
        MyCalculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    MyCalculator.compute()
    MyCalculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    MyCalculator.clear()
    MyCalculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    MyCalculator.delete()
    MyCalculator.updateDisplay()
})



