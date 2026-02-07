import './components/ui/input/Input.js';
import './components/ui/checkbox/Checkbox.js';
import './components/ui/radio/Radio.js';
import './components/ui/button/Button.js';

console.log('앱 초기화 및 컴포넌트 등록 완료.');

// 폼 핸들링 데모
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Web Components는 Shadow DOM을 사용하므로 일반 form 전송에 내부 input 값이 자동으로 포함되지 않을 수 있습니다.
    // 이를 해결하기 위해서는 ElementInternals(form-associated custom elements)를 사용하거나,
    // 아래와 같이 수동으로 데이터를 수집하는 방식을 사용할 수 있습니다.
    
    // 폼이 제출되면 표준 FormData를 사용하여 데이터를 수집합니다.
    // ui-* 컴포넌들이 렌더링 후에는 순수 input 태그로 변환(Unwrap)되므로 
    // 표준 API를 그대로 사용할 수 있습니다.
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('폼 데이터:', data);
    alert('폼이 제출되었습니다!\n' + JSON.stringify(data, null, 2));
  });
}
