import React from "react";
import { Typography, Button, Divider, Input } from "antd";
import * as FileUtils from "../../utils/file";
const { Title } = Typography;

interface Props {}

interface IState {
  inputFiles: FileList | null;
}

class FileByteSwap extends React.Component<Props, IState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      inputFiles: null,
    };
  }

  componentDidMount(): void {}

  onInputFilesChange = (e: any) => {
    this.setState({
      inputFiles: e.target.files,
    });
  };

  saveFile = () => {
    const {
      inputFiles,
    } = this.state;
    if (!inputFiles || !inputFiles.item(0)) {
      alert("没有选中文件");
      return;
    }

    const inputFile = inputFiles?.item(0);
    if (!inputFile) {
      alert("无法获取输入文件");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      if (!arrayBuffer) {
        alert("无法读取文件内容");
        return;
      }
      const data = new Uint8Array(arrayBuffer as ArrayBuffer);
      const outputData = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i += 2) {
        outputData[i] = data[i + 1];
        outputData[i + 1] = data[i];
      }
      const blob = new Blob([outputData]);
      FileUtils.saveData(blob, "swapped.dat");
    }
    fileReader.readAsArrayBuffer(inputFile);
  };

  render() {
    return (
      <div>
        <Title level={2}>文件字节对调</Title>
        <Divider orientation="left">功能</Divider>
        将选中文件中的每两个字节互相对调，保存为一个独立的文件。
        <Divider />
        <p>
          输入文件：
          <div style={{ display: "inline-block" }}>
            <Input type="file" onChange={this.onInputFilesChange} />
          </div>
        </p>
        <p>
          <Button
            type="default"
            style={{
              marginTop: 16,
            }}
            onClick={this.saveFile}
          >
            保存字节对调后的文件
          </Button>
        </p>
      </div>
    );
  }
}

export default FileByteSwap;
