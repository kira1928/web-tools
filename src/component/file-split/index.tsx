import React from "react";
import { Typography, Button, Divider, Input, InputNumber, Select } from "antd";
import "./index.css";
import * as FileUtils from "../../utils/file";
const { Option } = Select;
const { Title } = Typography;

interface Props {}

interface IState {
  inputFiles: FileList | null;
  startOffset: number;
  outputFileSizeNumber: number;
  outputFileSizeUnit: string;
}

class FileSplit extends React.Component<Props, IState> {
  defaultFileSizeUnit = "MB";

  constructor(props: Props) {
    super(props);
    this.state = {
      startOffset: 0,
      outputFileSizeNumber: 0,
      inputFiles: null,
      outputFileSizeUnit: this.defaultFileSizeUnit,
    };
  }

  componentDidMount(): void {}

  onInputFilesChange = (e: any) => {
    this.setState({
      inputFiles: e.target.files,
    });
  };

  onStartOffsetChange = (value: any) => {
    this.setState({
      startOffset: value,
    });
  };

  onOutputFileByteSizeChange = (value: any) => {
    this.setState({
      outputFileSizeNumber: value,
    });
  };

  onOutputFileSizeUnitChange = (value: string) => {
    this.setState({
      outputFileSizeUnit: value,
    });
  };

  saveFile = () => {
    const {
      inputFiles,
      startOffset,
      outputFileSizeNumber,
      outputFileSizeUnit,
    } = this.state;
    if (!inputFiles || !inputFiles.item(0)) {
      alert("没有选中文件");
      return;
    }
    let unit = 1;
    try {
      unit = FileUtils.parseFileSizeUnitToByteCount(outputFileSizeUnit);
    } catch (e) {
      console.error(e);
      alert((e as Error).message);
    }
    const outputFileByteSize = outputFileSizeNumber * unit;
    const inputFile = inputFiles?.item(0);
    if (!inputFile) {
      alert("无法获取输入文件");
      return;
    }

    const endOffset = startOffset + outputFileByteSize;
    const chunk = inputFile.slice(startOffset, endOffset);
    FileUtils.saveData(chunk, `${startOffset}-${endOffset}.dat`);
  };

  selectAfter = (
    <Select
      defaultValue={this.defaultFileSizeUnit}
      onChange={this.onOutputFileSizeUnitChange}
    >
      <Option value="GB">GB</Option>
      <Option value="MB">MB</Option>
      <Option value="KB">KB</Option>
      <Option value="B">B</Option>
    </Select>
  );

  render() {
    return (
      <div>
        <Title level={2}>分割文件</Title>
        <Divider orientation="left">功能</Divider>
        将选中文件中的一部分单独取出，保存为一个独立的文件。
        <Divider />
        <p>
          输入文件：
          <div style={{ display: "inline-block" }}>
            <Input type="file" onChange={this.onInputFilesChange} />
          </div>
        </p>
        <p>
          截取开始位置：{" "}
          <InputNumber
            min={0}
            defaultValue={0}
            precision={0}
            onChange={this.onStartOffsetChange}
          />
        </p>
        <p>
          截取多大下来：
          <InputNumber
            min={0}
            addonAfter={this.selectAfter}
            onChange={this.onOutputFileByteSizeChange}
          />
        </p>
        <p>
          <Button
            type="default"
            style={{
              marginTop: 16,
            }}
            onClick={this.saveFile}
          >
            保存切割下来的文件
          </Button>
        </p>
      </div>
    );
  }
}

export default FileSplit;
