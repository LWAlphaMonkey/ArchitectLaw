#coding=utf-8
import json
FILE_PATH = '/file-path'
FILE_NAME = 'file-name'

def main():
    fp = open(FILE_PATH + FILE_NAME + '.txt', 'r')
    out = {}
    line = fp.readline()
    out['law'] = line
    out['letters'] = []
    count = 0
    
    while True:
        line = fp.readline()
        if not line:
            break
        elif line == "\n":
            count += 1
            if count == 2:
                line = fp.readline()
                if '無' in line or '款' in line:
                    if '無' in line:
                        entry = ""
                    else:
                        entry = line
                    out['letters'].append({'entries':entry, 'contents':[]})
                else:
                    out['letters'][-1]['contents'].append({'title': line, 'subcontent':[]})
                    
                count = 0
        else:
            # to do
            # add order and class for the subcontent object
            out['letters'][-1]['contents'][-1]['subcontent'].append(line)

    with open(FILE_PATH + FILE_NAME + '.json', 'w') as outfile:
        json.dump(out, outfile, ensure_ascii=False)

main()