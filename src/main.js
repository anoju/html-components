import './components/ui/input/Input.js';
import './components/ui/checkbox/Checkbox.js';
import './components/ui/radio/Radio.js';

console.log('앱 초기화 및 컴포넌트 등록 완료.');

// 폼 핸들링 데모
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Web Components는 Shadow DOM을 사용하므로 일반 form 전송에 내부 input 값이 자동으로 포함되지 않을 수 있습니다.
    // 이를 해결하기 위해서는 ElementInternals(form-associated custom elements)를 사용하거나,
    // 아래와 같이 수동으로 데이터를 수집하는 방식을 사용할 수 있습니다.
    
    // 이번 데모에서는 React 스타일의 상태 관리나 수동 데이터 수집 방식을 보여줍니다.
    const data = {};
    const inputs = form.querySelectorAll('app-input, app-checkbox, app-radio');
    
    inputs.forEach(el => {
      const name = el.getAttribute('name');
      if (!name) return;
      
      if (el.tagName === 'APP-INPUT') {
        data[name] = el.querySelector('input').value; // Shadow DOM 제거됨
      } else if (el.tagName === 'APP-CHECKBOX') {
        if (el.hasAttribute('checked')) {
             data[name] = el.getAttribute('value') || 'on';
        }
      } else if (el.tagName === 'APP-RADIO') {
        if (el.hasAttribute('checked')) {
          data[name] = el.getAttribute('value');
        }
      }
    });

    console.log('폼 데이터:', data);
    alert('폼이 제출되었습니다!\n' + JSON.stringify(data, null, 2));
  });
}
