
//ham validator 
function Validator(options) {

    var selectorRules = {}

    //ham thuc hien validate
    function validate(inputElement, rule) {
        //value inputElement.value
        //test: rule.test
        function getParent(element, selector) {
            while (element.parentElement) {
                if (element.parentElement.matches(selector)) {
                    return element.parentElement;
                }
                element = element.parentElement;
            }
        }
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        // var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        // var errorMessage = rule.test(rule.selector)
        var errorMessage;
        //lay ra cac rule cua selector
        var rules = selectorRules[rule.selector]
        //lap qua tung rule  va kiem tra 

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerHTML = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage;// true -  co loi 
    }

    //lay element cua form can validate
    var formElement = document.querySelector(options.form);
    if (formElement) {

        //khi sumbit form 
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormVlaid = true;
            //lap qua tung rule va validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)
                var isVlaid = validate(inputElement, rule)

                if (!isVlaid) {
                    isFormVlaid = false;
                }
            })

            if (isFormVlaid) {
                //th submit voi js
                if (typeof options.onSubmit === 'function') {
                    var enableInput = formElement.querySelectorAll('[name]:not([disabled])')
                    var formValue = Array.from(enableInput).reduce(function (values, input) {
                        (values[input.name] = input.value)
                        return values
                    }, {});
                    options.onSubmit(formValue);
                }
                //th submit voi hanh vi mac dinh cua wed (da xoa bang preventDefault)
                else {
                    formElement.submit()
                }
            }
        }


        //xu ly lap qua moi rule va xu ly (lang nghe su kien , blur, input)
        options.rules.forEach((rule) => {

            //luu lai cac rule trong input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                //xu li th blur khoi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                //xu li moi khi nguoi dung nhap vao input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    // console.log(errorElement)
                    errorElement.innerHTML = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

//dinh nghia cac rules (quy tac)
//nguyen tac cua cac rules:
//1. khi co loi => message loi
//2.khi hop le => khong tra ra cai gi (undefine)
Validator.isRequied = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự `
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không trùng nhau'
        }
    }
}


Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequied("#fullname", 'Vui lòng nhập tên đầy đủ của bạn'), //bat buoc
        Validator.isRequied('#email'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
        Validator.isRequied("#password_confirmation"),
        Validator.isConfirmed('#password_confirmation', function () {
            return document.querySelector('#form-1 #password').value;
        }, 'Mật khẩu nhập lại không chính xác')
    ]
    // onSubmit: function (data) {
    //     // console.log(data);
    //     fetch('/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
    //         .then(data => {
    //             // console.log(data.success);
    //             if (data.success) {
    //                 alert('Đăng ký thành công!');
    //                 console.log('Success:', data);
    //                 window.location.href = '/';
    //             } else {
    //                 alert('Đăng ký thất bại: ' + data.message); // Hiển thị thông điệp lỗi từ server
    //             }
    //         })
    //         .catch((error) => {
    //             alert('Đăng ký thất bại!');
    //             console.error('Error:', error);
    //         });
    // }
});
