import { useState } from "react";
import { Button, Form, FormInstance, Space } from "antd";
import SimpleInput from "../../components/simple-input";

export default function Index() {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  return (
    <div style={{ width: 600, margin: "40px auto" }}>
      <div>
        <p>antd Form preserve 功能无法维持字段值</p>
        <p>操作步骤: </p>
        <p>1. 在 姓名 1 first 输入 123 将 price 1 展示出来</p>
        <p>2. 在 price 1 中输入值</p>
        <p>3. 点击隐藏, 点击显示按钮, 可以观察到输入的 price 1 字段值消失</p>
      </div>
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
    <Form form={form}>
      <Form.Item
        name="name"
        label="姓名"
        rules={[
          { required: true, message: "请输入姓名" },
          { type: "string", min: 4, max: 6 },
        ]}
      >
        <SimpleInput />
      </Form.Item>
      <Form.List
        name="list"
        initialValue={Array.from({ length: 1 }).map((_, index) => {
          return { first: "first name", last: "last name" };
        })}
      >
        {(fields, helpers) => (
          <>
            <Space style={{ marginBottom: 12 }}>
              <Button
                onClick={() => {
                  helpers.add();
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
                  label={`姓名 ${index + 1} first`}
                  rules={[
                    { required: true, message: "请输入姓名" },
                    { type: "string", min: 4, max: 6 },
                  ]}
                  initialValue={"first name field"}
                >
                  <SimpleInput />
                </Form.Item>
                <Form.Item
                  name={[field.name, "last"]}
                  label={`姓名 ${index + 1} last`}
                  rules={[
                    { required: true, message: "请输入姓名" },
                    { type: "string", min: 4, max: 6 },
                  ]}
                  initialValue={"first name field"}
                >
                  <SimpleInput />
                </Form.Item>
                <Form.Item shouldUpdate>
                  {({ getFieldValue }) => {
                    return getFieldValue(["list", field.name, "first"]) ===
                      "123" ? (
                      <Form.Item
                        key="price"
                        label={`price ${index + 1}`}
                        name={[field.name, "price"]}
                        preserve={false}
                      >
                        <SimpleInput placeholder="price" />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        key="other"
                        label={`other ${index + 1}`}
                        name={[field.name, "other"]}
                        initialValue="other"
                        preserve={false}
                      >
                        <SimpleInput placeholder="other" />
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
