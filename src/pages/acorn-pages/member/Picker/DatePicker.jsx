// DatePickerComponent.js
import React from 'react';
import { toast } from 'react-toastify';
import { DatePicker } from 'rsuite';

const DatePickerComponent = ({handleDate, value, readOnly}) => {
  const mindate = new Date();
  mindate.setHours(0, 0, 0, 0); // 오늘의 00:00로 설정
  
  const handleChange = (date) => {
    console.log("Selected date:", date);
    console.log("Minimum date:", mindate);

    const selectedDate = new Date(date);
    selectedDate.setHours(0,0,0,0); // 선택된 날짜도 초기화

    // 선택한 날짜가 mindate 이상인지 확인
    if (date >= mindate) {
      handleDate(date); // 유효한 경우 부모로 전달
    } else {
      toast.error("오늘 날짜보다 이전 날짜로 선택할 수 없습니다.");
    }
  };
  
  
  return (
    <div className="date-picker-container" onClick={(e) => readOnly && e.stopPropagation()}>
      {/* readOnly일 때 클릭 이벤트 차단 */}
      <DatePicker
        style={{ width: 600 }}
        placeholder="입사일을 선택해주세요 "
        format="yyyy / MM / dd"
        oneTap
        onChange={handleChange} 
        value={value}
        placement="bottomStart" // 팝업 위치 설정
        container={() => document.querySelector('.modal-body')} // 모달 내부로 제한
        disabled={readOnly} // readOnly에 따라 disabled 설정
      />
    </div>
  );
};

export default DatePickerComponent;