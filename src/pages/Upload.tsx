import { useState } from 'react';
import { create } from 'ipfs-http-client';
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Upload() {
  const [file, setFile] = useState<Uint8Array | null>(null);
  const [urlArr, setUrlArr] = useState<string[]>([]);

  const retrieveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files?.[0];
    if (data) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const buffer = new Uint8Array(reader.result as ArrayBuffer);
        console.log('Uint8Array data: ', buffer);
        setFile(buffer);
      };
      reader.readAsArrayBuffer(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const infuraProjectId = 'YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID

      const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: `Bearer ${infuraProjectId}`,
        },
      });
      const created = await ipfs.add(file as Buffer);

      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              paddingBlock: '3rem',
              border: '1px solid rgba(0, 83, 50, 0.8)',
            }}
          >
            <img src="asset/icon.png" alt="download icon" />
            <label htmlFor="upload" style={{ color: 'rgba(0, 83, 50, 0.8)' }}>
              Click to upload
            </label>
            <input
              type="file"
              id="upload"
              style={{ display: 'none' }}
              name="data"
              onChange={retrieveFile}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: 'rgba(0, 83, 50, 0.8)',
              outline: 'none',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              paddingBlock: '1rem',
            }}
            className="btn"
          >
            Upload file
          </button>
        </section>
      </form>
      <div className="display">
        {urlArr.length !== 0 ? (
          urlArr.map((el, index) => <img key={index} src={el} alt="nfts" />)
        ) : (
          <h3>Upload data</h3>
        )}
      </div>
    </div>
  );
}

export default Upload;
