import React from 'react'
import io from "socket.io-client";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
const socket = io.connect("http://localhost:3001");


function Chats() {
  const [value2, setValue2] = React.useState(0);
  return (
    <div>

      <h3>join chat</h3>
      <input placeholder='name' />
      <input placeholder='' />
      <div className="flex-auto">
        <label htmlFor="withoutgrouping" className="font-bold block mb-2">Without Grouping</label>
       
       
        <InputNumber inputId="withoutgrouping" value={value2} onValueChange={(e) => setValue2(e.value)} useGrouping={false} />
      </div>
      <div className="card flex justify-content-center">
            <Button label="Submit" />
        </div>
    </div>
  )
}

export default Chats