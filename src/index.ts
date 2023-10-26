import { ExtensionContext } from "@foxglove/studio";
import { PoseInFrame } from "@foxglove/schemas";
import { Time } from "@foxglove/schemas/schemas/typescript/Time";

type PointStamped = {
  header: {
    stamp: Time,
    frame_id: string  
  },
  point: {
    x: number,
    y: number,
    z: number
  }
}

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerMessageConverter({
    fromSchemaName: "geometry_msgs/msg/PointStamped",
    toSchemaName: "foxglove.PoseInFrame",
    converter: (inputMessage: PointStamped): PoseInFrame => {
      return {
        timestamp: inputMessage.header.stamp,
        frame_id: inputMessage.header.frame_id,
        pose: {
          position: inputMessage.point,
          orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1
          }
        }
      }
    }
  })
}
