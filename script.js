document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const submitButton = document.getElementById('submit-button');
    const currentTimeElement = document.getElementById('current-time');

    // 显示当前日期和时间
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        currentTimeElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
    updateTime();
    setInterval(updateTime, 1000);

    // 表单验证
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交
        let isValid = true;

        // 验证姓名
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // 验证邮箱格式
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // 如果所有字段都验证通过，则弹出成功提示
        if (isValid) {
            alert('表单已成功提交！感谢你的留言。');
            // 这里可以添加发送表单数据的代码
            // form.submit(); // 如果需要真正提交到服务器
            form.reset(); // 提交成功后清空表单
        } else {
            alert('请检查你的输入，并填写所有必填字段。');
        }
    });

    // 动态效果：点击按钮改变样式
    submitButton.addEventListener('click', function() {
        submitButton.style.backgroundColor = '#1e7e34';
        setTimeout(() => {
            submitButton.style.backgroundColor = '#28a745';
        }, 300);
    });
});