import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
    });

    if (response.assets && response.assets.length) {
      return [response.assets.filter(asset => !!asset.uri).at(0)?.uri ?? ''];
    }
    return [];
  }

  static async getPicturesFromLibrary(): Promise<string[]> {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 10,
    });

    if (response.assets && response.assets.length) {
      return response.assets
        .filter(asset => asset.uri)
        .map(asset => asset.uri ?? '');
    }

    return [];
  }
}
