import requests
url = "https://haloruns.com/content/metadata/global.json"
r = requests.get(url)
f = open("results.txt", "w")
n = 0;
while n < 9:
    must = r.json()["Entries"][n]["CategoryId"]
    test = r.json()["Entries"][n]["RunnableSegmentId"]
    kys = r.json()["Entries"][n]["Participants"][0]["EvidenceLink"]
    f.write("RunnableSegmentId: " + test + " YT Link: " + kys+ "\n")
    first = must[0]
    print(first)
    print(n)
    n += 1;
f.close()