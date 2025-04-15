import { useState } from "react";
import { Button, Form, FormInstance, Space } from "antd";
import SimpleInput from "../../components/simple-input";

export default function Index() {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  return (
    <div style={{ width: 340, margin: "40px auto" }}>
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
      </Space>
      {visible && <FormDisplay form={form} />}
    </div>
  );
}

function FormDisplay(props: { form: FormInstance<any> }) {
  const { form } = props;

  return (
    <Form form={form} preserve={false}>
      <Form.Item
        name="name"
        label="姓名"
        rules={[
          { required: true, message: "请输入姓名" },
          { type: "string", min: 4 },
        ]}
      >
        <SimpleInput />
      </Form.Item>
      <Form.List
        name="list"
        initialValue={Array.from({ length: 1000 }).map((_, index) => {
          return { first: "first name", last: "last name" };
        })}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[field.name, "first"]}
                  label={`姓名 ${index + 1}`}
                  rules={[
                    { required: true, message: "请输入姓名" },
                    { type: "string", min: 4 },
                  ]}
                  initialValue={"first name field"}
                >
                  <SimpleInput />
                </Form.Item>
                <Form.Item
                  name={[field.name, "last"]}
                  label={`姓名 ${index + 1}`}
                  rules={[
                    { required: true, message: "请输入姓名" },
                    { type: "string", min: 4 },
                  ]}
                  initialValue={"first name field"}
                >
                  <SimpleInput />
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
}
