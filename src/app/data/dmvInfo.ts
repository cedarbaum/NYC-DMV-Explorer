export namespace DmvInfo {
  export enum Region {
    Bronx,
    Brooklyn,
    Manhattan,
    Queens,
  }

  export function getBranchNameById(id: string) {
      for (var regionIdx = 0; regionIdx < BRANCHES.length; regionIdx++) {
          const branch = BRANCHES[regionIdx].items.find(b => b.value == id)
          if (branch) {
              return branch.label;
          }
      }

      return undefined;
  }

  export function getDurationForServiceInMins(id: string) {
      const service = SERVICES.find(s => s.publicId == id);
      if (service) {
          return service.duration;
      }

      return undefined;
  }

  export const BRANCHES = [
    {
      label: 'Bronx',
      value: Region.Bronx,
      items: [
        {
          value:
            '1182b855bd56271c687d54d6d7f9559926297a76260f8329574d3396bf810763',
          label: 'Bronx License Center',
        },
        {
          value:
            '99f6c320206ee03f9dcce5b83eddcbfd30cd2e30bbe53c51d7116c2b33ce9ccd',
          label: 'Bronx Registration Center',
        },
        {
          value:
            '0a4b5fa1c341553382a0edd3d94494885c7df0d1d344bb7ee423fbf87ac3f08c',
          label: 'Traffic Violations Bureau (TVB)',
        },
      ],
    },
    {
      label: 'Brooklyn',
      value: Region.Brooklyn,
      items: [
        {
          value:
            'c92d2048b00326a0d9452e478db504ce41ec8f67f8e008034295cbf85cf902df',
          label: 'Atlantic Center Mall',
        },
        {
          value:
            '3914c0e993e5c57e7a92082a4e78ccee9c80cb10e221887173d9e6038fafe5be',
          label: 'Chisholm License Center (Hanson Place)',
        },
        {
          value:
            '0b2bd54bb4e54eae475cf1b266cf85bec683771e5e231af74e292177ae5e2640',
          label: 'Coney Island',
        },
        {
          value:
            '19aea79d6e0792bf12e58590a84a381cc2e3719c1a85e5d763d6ac9d6415e9cd',
          label: 'Traffic Violations Bureau (TVB)',
        },
        {
          value:
            'f6c7a34b174fe992e5ffe23df19abf46f229ae10388b8048141b2f4199fd46a1',
          label: 'Traffic Violations Bureau (TVB)',
        },
      ],
    },
    {
      label: 'Manhattan',
      value: Region.Manhattan,
      items: [
        {
          value:
            'ba4178c73f0cb0c91cf158865f174487cd4dcc79a86bdbbe5502730ed7e7b5b1',
          label: 'Harlem',
        },
        {
          value:
            '179ae5ccf5c698b59667f2bdade8a5866f8888edfb922b10caaab2821d50169b',
          label: 'License Express (West 30th St.)',
        },
        {
          value:
            '8bcc5ca5cad16666ba6f5dd43d15241e172bd511f7e8d6f2e1caa2380b66776a',
          label: 'Lower Manhattan (Financial District)',
        },
        {
          value:
            '0ea16b72515a86e0cc00d186b249b0ebc61ed10b5289394af9b0cab8de5dafda',
          label: 'Midtown Manhattan (Near Penn Station)',
        },
        {
          value:
            '9e807e3705a27988bbabd1c8b67e1f2e7ab4e59987bd36d4aec7102345ba4780',
          label: 'Traffic Violations Bureau (TVB)',
        },
        {
          value:
            'f4a0d4f38392a8fad80e6db9890fb68f641df1cbcec62434df169982edeb9c6e',
          label: 'Traffic Violations Bureau (TVB)',
        },
      ],
    },
    {
      label: 'Queens',
      value: Region.Queens,
      items: [
        {
          value:
            'fb052d6eae67926d8d5449d7317c8528e1e3d02b19441ead85f3150915e2abbe',
          label: 'College Point',
        },
        {
          value:
            'd0099bebf8e51979019b5e45b2c7dfeab9830f0213a4da0cfd569ec145eb07a9',
          label: 'Jamaica',
        },
        {
          value:
            '887df9bcd65c813a07ac3ae5e818d4faec1aa02bb467ea5cb2e1e2e878bfa32a',
          label: 'Queens College License Center',
        },
        {
          value:
            '2da2cfd743542bc26618bf7d35559501aee630de80c66a5f884f86d61bc5e780',
          label: 'Springfield Gardens',
        },
        {
          value:
            'd595326e4d0a22132503517b17441335141a5dfe249112365e044c85f0631ff0',
          label: 'Traffic Violations Bureau (TVB)',
        },
        {
          value:
            '0ac4c5008bb7758fd457422805b09f3d84cd1df9d0ed3ca651a018baca8dfc94',
          label: 'Traffic Violations Bureau (TVB)',
        },
      ],
    },
  ];

  export const SERVICES = [
    {
      duration: 30,
      langNames: {},
      internalId: 3,
      custom: '{"names":{}}',
      name: '01. Register/Get Plates for My Vehicle',
      publicId:
        'ee3480a8232e72e54071cd185388c691f829fa2670e5e6a6f966385908462cb8',
      qpId: '4',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 26,
      name: '02. Upgrade to a Real ID or EDL (with or without renewal)',
      publicId:
        '13cd38b2175347f38fe21325ad67e1e4ec04f36e89e92804462184544ace9b2f',
      qpId: '44',
      additionalDuration: 0,
    },
    {
      duration: 30,
      langNames: {},
      internalId: 40,
      name: '03. Pay Cash to Renew Your Photo Document (No Upgrade/No Photo)',
      publicId:
        '4ec745aaba5800ddb8fea03c823118afe3a65f4635f12e8ec69b9df5d10a0eec',
      qpId: '47',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 14,
      custom: '{"names":{}}',
      name: '04. Get a NY Non-Driver ID',
      publicId:
        'bed896835d46b0a806fc80571852b4e1233a1f2fb48531b3a4a8cd220d6b1436',
      qpId: '39',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 18,
      name: '05. Renew Your Commercial Driver License',
      publicId:
        'c781ba0818242f9719819f6b96bbfd10d199cdbc68b3062a462361deb8284bc3',
      qpId: '38',
      additionalDuration: 0,
    },
    {
      duration: 30,
      langNames: {},
      internalId: 24,
      name: '06. Take a Commercial Driver License Permit or Endorsement Test',
      publicId:
        '1051c0c0a05f68662fc92b4041a3febafe5c97f1a08cfa8ca03a37562b0b4987',
      qpId: '36',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 39,
      name: '07. After Passing CDL Road Test, Get CDL License',
      publicId:
        '14aa1ba93f118c5ef27b7c027e7ae29002bfa56fc9caa2babe1a1ed28dd18a78',
      qpId: '48',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 21,
      name: '08. Exchange Your Out of State License',
      publicId:
        '2cac88e280dfb5f69ecf53ace1a0c00e4d43ba8d14c55a99ee5cb52e824b7389',
      qpId: '41',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 19,
      custom: '{"names":{}}',
      name: '09. Restore a Revoked/Suspended License',
      publicId:
        '8269e653b56de4a114b84559eea58c9fcb707c9846ba447c8bb01480322bb06f',
      qpId: '35',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 20,
      name: '10. Apply for a Restricted/Conditional License',
      publicId:
        'b2bbf5c982b9aa88b4427369f1328c59b53fdd19eca9e082947bc2c0038ca3d1',
      qpId: '33',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 16,
      name: '11. Change Information or Class on your Photo Document (Non-Renewal)',
      publicId:
        'ef2ce56f941fe9daafa4b57b5dff5e1295f20dfbeb9763e5b54539909be67e8b',
      qpId: '37',
      additionalDuration: 0,
    },
    {
      duration: 15,
      langNames: {},
      internalId: 4,
      custom: '{"names":{}}',
      name: '12. Change Name on Photo Document',
      publicId:
        '06b1dc258a49ba1f54d2dca9133fd4e24ff6c2890d044f8d9d49a2060b441ac8',
      qpId: '40',
      additionalDuration: 0,
    },
    {
      duration: 20,
      langNames: {},
      internalId: 5,
      custom: '{"names":{}}',
      name: '13. Take a Car or Motorcycle Permit Test',
      publicId:
        '10226f4de0f460aa67bb735db97f9eb434b8ac2a144e40a20ff1e1848ffbeae7',
      qpId: '17',
      additionalDuration: 0,
    },
  ];
}
