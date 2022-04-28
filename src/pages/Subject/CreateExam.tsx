import React from 'react'

type Props = {}

const CreateExam = (props: Props) => {
  return (
    <div className="create__exam">
      <div className="create__exam__main">
        <div className="create__exam__title">
          <h3>Tạo đề thi môn: Nhập môn CNPM</h3>
        </div>
      </div>
      <div className="create__exam__list">
        <div className="create__exam__scroll">
          <div className="create__exam__item"></div>
        </div>
      </div>
    </div>
  )
}

export default CreateExam
