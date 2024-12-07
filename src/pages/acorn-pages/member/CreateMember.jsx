import { useEffect, useState } from "react";
import { SelectPicker } from 'rsuite';
import { useRef } from "react";
import DatePickerComponent from './Picker/DatePicker'
import SelectPickerComponent from "./Picker/SelectPicker";
import '../../../styles/modal.css';

const MemberModal = ({handleChange, insertProcess, setShowModal, show}) => {
    const [selectedJob, setSelectedJob] = useState(""); // 직책 상태
    const modalRef = useRef(null); // modal DOM 참조
  
    const today = new Date(); // 오늘 날짜 가져오기 
    today.setHours(0,0,0,0); // mindate 설정에 시간까지 들어가서 오늘날짜 선택 안됌 -> 시간 정보 제거
    const [selectedDate, setSelectedDate] = useState(new Date());

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() -1); 
    useEffect(() => {
      if (memberData && memberData.memberDate) {
        const hireDate = new Date(memberData.memberDate);
        hireDate.setHours(0, 0, 0, 0); // 불러온 날짜의 시간 초기화
  
        // hireDate가 유효한 날짜인지 확인하고, 유효하지 않으면 today로 설정
        if (!isNaN(hireDate.getTime())) {
          setSelectedDate(hireDate); // 입사일이 유효하면 selectedDate로 설정
        } else {
          setSelectedDate(today); // 유효하지 않으면 기본 오늘 날짜로 설정
        }
      }
    }, [memberData]);  // memberData가 변경될 때마다 입사일을 업데이트
   
    // handleChange에 직책저장하는 이벤트 추가해주기
    const handleJob = (value) => {
      setSelectedJob(value); // selectedJob 업데이트
      handleChange({target : {name:"memberJob", value}}); // 부모 handle이벤트에 추가해주기
    }

    const handleDate = (date) => {
      console.log("selected date",date);
      // 선택된 날짜도 시간 초기화
      date.setHours(0,0,0,0);
      setSelectedDate(date);
      handleChange({target : {name:'memberDate', value:date}}); // 부모로 전달된 handleChange함수 호출
      console.log('update date',date)
    }

                  
    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1080 }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">직원 등록</h5>
                {/* onClick={() => setShowModal(true)} : 등록 모달 열기 */}
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
    
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>직원 사번</label>
                    <input type="text" name="memberId" onChange={handleChange}
                      className="form-control" placeholder="사번을 입력하세요." />
                  </div>
    
                  <div className="mb-3">
                    <label>직원 이름</label>
                    <input type="text" name="memberName" onChange={handleChange}
                      className="form-control" placeholder="직원 이름을 입력하세요." />
                  </div>

                  {/*
                  <div className="mb-3">
                    <label>직원 직책</label>
                    <select  
                      name="memberJob"
                      value={selectedJob}
                      onChange={handleJob}
                      className="form-control">
                    <option value="" disabled >직책을 선택해주세요</option>    
                    <option value="원장">원장</option>
                    <option value="부원장">부원장</option>
                    <option value="실장">실장</option>
                    <option value="디자이너">디자이너</option>
                    <option value="인턴">인턴</option>
                    </select>
                  </div>
                  */}
                  <div className="mb-3">
                    <SelectPickerComponent
                    value={selectedJob}
                    handleJob={handleJob}
                    />
                  </div>

                  <div className="mb-3" ref={modalRef}>
                    <label>입사일</label>
                    <DatePickerComponent
                     name="memberDate"
                     mindate={yesterday} // Date 객체로 전달 
                     handleDate={handleDate}
                     
                     value={selectedDate}
                    />
                    {/*
                    <Calendar selectedDate={hireDate} onDateChange={setHireDate}/>
                    */}
                  </div>

                  <div className="mb-3">
                    <label>연락처</label>
                    <input type="text" name="memberTel" onChange={handleChange}
                      className="form-control" placeholder="직원 연락처를 입력하세요." />
                  </div>

                </form>
              </div>
    
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  닫기
                </button>
                <button type="button" className="btn btn-primary" onClick={insertProcess}>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
export default MemberModal;