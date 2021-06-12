# Evolution Simulator

Evolution simulator built with P5JS. This simulator features two competing species (red and blue). Each species has the ability to mate, eat, and mutate. Mutations can occur randomly, but are much more likely to occur is one or two parent already possess the mutation. If a mutation is favorable, it will tend to be spread throughout the population. Once one species' population decreases to 0, the other species wins the simulation. 

## Usage

To run, use a HTTP server. I use a simple Python script, but many other methods are available such as VS Code's liveserver.

```bash
python3 -m http.server
```

## Rules

* Specimens with a white dot have a mutation
* Specimens with green dot have the 'predate' mutation, allowing them to consume the other species
* Each species start out with a population of 5
* Vegitation regenerates when there are less then 10 left in the environment
* First species to wipe the other out wins



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)