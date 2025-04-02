import { useState } from "react";
import { Button, Input, Space } from "antd";
import { Form, FormInstance } from "@mink-ui/core";
import kv from "@mink-ui/emator";

export default function Index() {
  const [visible, setVisible] = useState(true);
  const form = Form.useForm();

  return (
    <div>
      <div style={{ width: 500, margin: "40px auto" }}>
        <Space style={{ marginBottom: 12 }}>
          <Button onClick={() => setVisible(!visible)}>
            {visible ? "隐藏" : "显示"}
          </Button>
          <Button
            onClick={() => {
              const s = performance.now();
              const values = form.getFieldsValue();
              const e = performance.now();
              console.log("diff:ms", e - s, values);
            }}
          >
            getValues
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置字段
          </Button>
        </Space>
        {visible && <FormDisplay form={form} />}
      </div>
      <div>
        <code
          style={{ whiteSpace: "pre" }}
          dangerouslySetInnerHTML={{
            __html:
              `  function FormDisplay(props: { form: FormInstance<any> }) {  
                  const { form } = props;  
                  const nameRequired = kv.string().min(3).max(10).required("请输入姓名");  
                  return (    
                    <Form form={form} preserve={false}>     
                      <Form.Item name="name" label="姓名" rule={nameRequired}>       
                       <Input />      
                      </Form.Item>      
                      <Form.List 
                        name="list"
                        initialValue={[{ first: "first name", last: "last name" }]}
                      >        
                        {(fields, helpers) => (
                          <>
                            <Space style={{ marginBottom: 12 }}>              
                              <Button onClick={() => { helpers.append(); }}>
                                add
                              </Button>
                              <Button onClick={() => { helpers.remove(0); }}>
                                remove first
                              </Button>
                            </Space>
                            {fields.map((field, index) => (
                              <div key={field.key}>
                                <Form.Item 
                                  name={[field.name, "first"]}                  
                                  label={\`姓名 \${index + 1}\`}
                                  rule={nameRequired}                  
                                  initialValue={"first name field"}                
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={[field.name, "last"]}
                                  label={\`姓名 \${index + 1}\`}
                                  rule={nameRequired}
                                  initialValue={"last name field"}
                                >                  
                                  <Input />
                                </Form.Item>
                                <Form.Item shouldUpdate>                  
                                  {({ getFieldValue }) => { 
                                    return getFieldValue(["list", field.name, "first"]) === "123" 
                                    ? (
                                      <Form.Item                        
                                        label={\`price \${index + 1}\`}
                                        name={[field.name, "price"]}
                                        preserve={false}
                                      >
                                        <Input placeholder="price" />
                                      </Form.Item> 
                                    ) : (
                                      <Form.Item
                                        label={\`other \${index + 1}\`}
                                        name={[field.name, "other"]}
                                        initialValue="other"                        
                                        preserve={false}                      
                                      >                        
                                        <Input placeholder="other" />                      
                                      </Form.Item>                    
                                    );}}
                                </Form.Item>              
                              </div>
                            ))}          
                          </>
                        )}
                      </Form.List>
                    </Form>
                  );
                }`.replace(/\</g, "&lt;"),
          }}
        ></code>
      </div>
    </div>
  );
}

function FormDisplay(props: { form: FormInstance<any> }) {
  const { form } = props;

  const nameRequired = kv.string().min(3).max(10).required();

  return (
    <Form form={form} preserve={false}>
      <Form.Item name="name" label="姓名" rule={nameRequired}>
        <Input />
      </Form.Item>
      <Form.List
        name="list"
        initialValue={[{ first: "first name", last: "last name" }]}
      >
        {(fields, helpers) => (
          <>
            <Space style={{ marginBottom: 12 }}>
              <Button
                onClick={() => {
                  helpers.append();
                }}
              >
                add
              </Button>
              <Button
                onClick={() => {
                  helpers.remove(0);
                }}
              >
                remove first
              </Button>
            </Space>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[field.name, "first"]}
                  label={`姓名 ${index + 1}`}
                  rule={nameRequired}
                  initialValue={"first name field"}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, "last"]}
                  label={`姓名 ${index + 1}`}
                  rule={nameRequired}
                  initialValue={"last name field"}
                >
                  <Input />
                </Form.Item>
                <Form.Item shouldUpdate>
                  {({ getFieldValue }) => {
                    return getFieldValue(["list", field.name, "first"]) ===
                      "123" ? (
                      <Form.Item
                        label={`price ${index + 1}`}
                        name={[field.name, "price"]}
                        preserve={false}
                      >
                        <Input placeholder="price" />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        label={`other ${index + 1}`}
                        name={[field.name, "other"]}
                        initialValue="other"
                        preserve={false}
                      >
                        <Input placeholder="other" />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
}
